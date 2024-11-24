import request from "@/utils/request";

// 查询基层党建决策指挥中心所有大屏数据
export function getGrassrootPartyData() {
  return request({
    url: "/strategy/grassroot/party/data",
    method: "get",
  });
}

// 查询队伍凝聚力数据
export function getCohesionData() {
  return request({
    url: "/strategy/grassroot/party/cohesion",
    method: "get",
  });
}

// 查询组织运行力数据
export function getOperationData() {
  return request({
    url: "/strategy/grassroot/party/operation",
    method: "get",
  });
}

// 查询服务保障力数据
export function getServiceGuaranteeData() {
  return request({
    url: "/strategy/grassroot/party/serviceGuarantee",
    method: "get",
  });
}

// 查询综合影响力数据
export function getInfluenceData() {
  return request({
    url: "/strategy/grassroot/party/influence",
    method: "get",
  });
}

// 查询融合式党建数据
export function getFusionPartyData() {
  return request({
    url: "/strategy/grassroot/party/fusion",
    method: "get",
  });
}

// 查询基层治理数据
export function getGovernanceData() {
  return request({
    url: "/strategy/grassroot/party/governance",
    method: "get",
  });
}

// 查询共富工坊数据
export function getWorkshopData() {
  return request({
    url: "/strategy/grassroot/party/workshop",
    method: "get",
  });
}
