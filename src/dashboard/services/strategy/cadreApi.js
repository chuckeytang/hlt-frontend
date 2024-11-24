import request from "@/utils/request";

// 获取干部决策指挥数据
export function getCadreDecisionData() {
  return request({
    url: "/strategy/cadre/decision/data",
    method: "get",
  });
}

// 获取潮学堂数据
export function getChaoXueTangData() {
  return request({
    url: "/strategy/cadre/decision/chaoxuetang",
    method: "get",
  });
}

// 获取区管干部数据
export function getDistrictCadresData() {
  return request({
    url: "/strategy/cadre/decision/districtCadres",
    method: "get",
  });
}

// 获取公务员数据
export function getCivilServantsData() {
  return request({
    url: "/strategy/cadre/decision/civilServants",
    method: "get",
  });
}

// 获取干部多维评价数据
export function getCadreEvaluationData() {
  return request({
    url: "/strategy/cadre/decision/evaluation",
    method: "get",
  });
}
