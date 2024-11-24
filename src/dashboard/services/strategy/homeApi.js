import request from "@/utils/request";

// 获取首页汇总数据
export function getHomePageData() {
  return request({
    url: "/strategy/home/data",
    method: "get",
  });
}

// 获取干部板块数据
export function getCadreData() {
  return request({
    url: "/strategy/home/cadre",
    method: "get",
  });
}

// 获取人才板块数据
export function getTalentData() {
  return request({
    url: "/strategy/home/talent",
    method: "get",
  });
}

// 获取基层党建板块数据
export function getGrassrootsPartyData() {
  return request({
    url: "/strategy/home/grassroots",
    method: "get",
  });
}

// 获取现代社区板块数据
export function getModernCommunityData() {
  return request({
    url: "/strategy/home/community",
    method: "get",
  });
}

// 获取综合考核板块数据
export function getComprehensiveAssessmentData() {
  return request({
    url: "/strategy/home/assessment",
    method: "get",
  });
}

// 获取信息宣传成果板块数据
export function getInformationAchievementsData() {
  return request({
    url: "/strategy/home/achievements",
    method: "get",
  });
}
