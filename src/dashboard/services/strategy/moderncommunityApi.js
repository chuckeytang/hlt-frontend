import request from "@/utils/request";

// 获取现代社区所有数据（聚合接口）
export function getModernCommunityData() {
  return request({
    url: "/strategy/moderncommunity/data",
    method: "get",
  });
}

// 获取五星三色数据
export function getFiveStarThreeColorData() {
  return request({
    url: "/strategy/moderncommunity/fivestarthreecolor",
    method: "get",
  });
}

// 获取奔竞榜/先锋榜数据
export function getCommunityRankingData() {
  return request({
    url: "/strategy/moderncommunity/ranking",
    method: "get",
  });
}

// 获取党建统领数据
export function getPartyLeadershipData() {
  return request({
    url: "/strategy/moderncommunity/partyleadership",
    method: "get",
  });
}

// 获取经济生态数据
export function getEconomicEcologyData() {
  return request({
    url: "/strategy/moderncommunity/economic",
    method: "get",
  });
}

// 获取平安法治数据
export function getSafeLawData() {
  return request({
    url: "/strategy/moderncommunity/safelaw",
    method: "get",
  });
}

// 获取公共服务数据
export function getPublicServiceData() {
  return request({
    url: "/strategy/moderncommunity/publicservice",
    method: "get",
  });
}

// 获取双十举措数据
export function getDoubleTenMeasureData() {
  return request({
    url: "/strategy/moderncommunity/doubleten",
    method: "get",
  });
}

// 获取重点社区打造数据
export function getKeyCommunityProjectData() {
  return request({
    url: "/strategy/moderncommunity/keycommunity",
    method: "get",
  });
}

// 获取重点目标指标数据
export function getKeyIndicatorData() {
  return request({
    url: "/strategy/moderncommunity/keyindicator",
    method: "get",
  });
}

// 获取重点任务列表数据
export function getKeyTaskData() {
  return request({
    url: "/strategy/moderncommunity/keytask",
    method: "get",
  });
}
