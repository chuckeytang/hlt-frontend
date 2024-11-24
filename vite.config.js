import { defineConfig, loadEnv } from "vite";
import path from "path";
import createVitePlugins from "./vite/plugins";
import fs from "fs";
import Importer from "vite-plugin-importer";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === "production" ? "/" : "/",
    plugins: [
      createVitePlugins(env, command === "build"),
      Importer({
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: (name) => `ant-design-vue/es/${name}/style/index.less`,
      }),
    ],
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        "~": path.resolve(__dirname, "./"),
        // 设置别名
        "@": path.resolve(__dirname, "./src"),
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    // vite 相关配置
    server: {
      port: 443,
      host: true,
      open: true,
      https: {
        key: fs.readFileSync("./server.key"), // 自签名证书的 key 文件路径
        cert: fs.readFileSync("./server.crt"), // 自签名证书的 cert 文件路径
      },
      proxy: {
        "/dev-api": {
          target: "https://localhost:18443",
          changeOrigin: true,
          rewrite: (p) => {
            return p;
          },
          secure: false,
        },
      },
    },
    //fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true, // 启用 JavaScript 处理
          modifyVars: {
            "primary-color": "#1890ff", // 主色
            "link-color": "#1DA57A", // 链接色
            "border-radius-base": "4px", // 圆角
            // 根据需求修改其他主题变量
          },
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
  };
});
