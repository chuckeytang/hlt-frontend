<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="姓名" prop="personalName">
        <el-input
          v-model="queryParams.personalName"
          placeholder="请输入姓名"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="身份证号" prop="personalIdNumber">
        <el-input
          v-model="queryParams.personalIdNumber"
          placeholder="请输入身份证号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="党组织支部名称" prop="partyBranch">
        <el-input
          v-model="queryParams.partyBranch"
          placeholder="请输入党组织支部名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="入党时间" prop="joinDate">
        <el-date-picker
          clearable
          v-model="queryParams.joinDate"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择入党时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="所属镇街" prop="townStreet">
        <el-input
          v-model="queryParams.townStreet"
          placeholder="请输入所属镇街"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createdAt">
        <el-date-picker
          clearable
          v-model="queryParams.createdAt"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择创建时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间" prop="updatedAt">
        <el-date-picker
          clearable
          v-model="queryParams.updatedAt"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择更新时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['mobileparty:archive:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['mobileparty:archive:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['mobileparty:archive:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['mobileparty:archive:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="archiveList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="唯一标识" align="center" prop="id" />
      <el-table-column label="姓名" align="center" prop="personalName" />
      <el-table-column
        label="身份证号"
        align="center"
        prop="personalIdNumber"
      />
      <el-table-column
        label="党组织支部名称"
        align="center"
        prop="partyBranch"
      />
      <el-table-column
        label="入党时间"
        align="center"
        prop="joinDate"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.joinDate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="流动类型" align="center" prop="flowType" />
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="所属镇街" align="center" prop="townStreet" />
      <el-table-column label="比对结果" align="center" prop="compareResult" />
      <el-table-column label="回填信息" align="center" prop="backfillInfo" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createdAt"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.createdAt, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updatedAt"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.updatedAt, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button
            link
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['mobileparty:archive:edit']"
            >修改</el-button
          >
          <el-button
            link
            type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['mobileparty:archive:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改流动党员信息档案对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="archiveRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="personalName">
          <el-input v-model="form.personalName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="身份证号" prop="personalIdNumber">
          <el-input
            v-model="form.personalIdNumber"
            placeholder="请输入身份证号"
          />
        </el-form-item>
        <el-form-item label="党组织支部名称" prop="partyBranch">
          <el-input
            v-model="form.partyBranch"
            placeholder="请输入党组织支部名称"
          />
        </el-form-item>
        <el-form-item label="入党时间" prop="joinDate">
          <el-date-picker
            clearable
            v-model="form.joinDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择入党时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所属镇街" prop="townStreet">
          <el-input v-model="form.townStreet" placeholder="请输入所属镇街" />
        </el-form-item>
        <el-form-item label="比对结果" prop="compareResult">
          <el-input
            v-model="form.compareResult"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="回填信息" prop="backfillInfo">
          <el-input
            v-model="form.backfillInfo"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="创建时间" prop="createdAt">
          <el-date-picker
            clearable
            v-model="form.createdAt"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择创建时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间" prop="updatedAt">
          <el-date-picker
            clearable
            v-model="form.updatedAt"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择更新时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Archive">
import {
  listArchive,
  getArchive,
  delArchive,
  addArchive,
  updateArchive,
} from "@/api/business/information/mobileparty/archive";

const { proxy } = getCurrentInstance();

const archiveList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    personalName: null,
    personalIdNumber: null,
    partyBranch: null,
    joinDate: null,
    flowType: null,
    status: null,
    townStreet: null,
    compareResult: null,
    backfillInfo: null,
    createdAt: null,
    updatedAt: null,
  },
  rules: {
    createdAt: [
      { required: true, message: "创建时间不能为空", trigger: "blur" },
    ],
    updatedAt: [
      { required: true, message: "更新时间不能为空", trigger: "blur" },
    ],
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询流动党员信息档案列表 */
function getList() {
  loading.value = true;
  listArchive(queryParams.value).then((response) => {
    archiveList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    personalName: null,
    personalIdNumber: null,
    partyBranch: null,
    joinDate: null,
    flowType: null,
    status: null,
    townStreet: null,
    compareResult: null,
    backfillInfo: null,
    createdAt: null,
    updatedAt: null,
  };
  proxy.resetForm("archiveRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加流动党员信息档案";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value;
  getArchive(_id).then((response) => {
    form.value = response.data;
    open.value = true;
    title.value = "修改流动党员信息档案";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["archiveRef"].validate((valid) => {
    if (valid) {
      if (form.value.id != null) {
        updateArchive(form.value).then((response) => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addArchive(form.value).then((response) => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal
    .confirm('是否确认删除流动党员信息档案编号为"' + _ids + '"的数据项？')
    .then(function () {
      return delArchive(_ids);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
    .catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    "mobileparty/archive/export",
    {
      ...queryParams.value,
    },
    `archive_${new Date().getTime()}.xlsx`
  );
}

getList();
</script>
