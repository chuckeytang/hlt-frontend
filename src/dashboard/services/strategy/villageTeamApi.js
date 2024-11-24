import request from "@/utils/request";

/**
 * 获取村社队伍完整数据
 * @returns {Promise} 包含村社队伍完整数据的 Promise
 */
export function getVillageTeamData() {
  return request({
    url: "/strategy/villageTeam/data",
    method: "get",
  });
}

/**
 * 获取书记统计信息
 * @returns {Promise} 包含书记统计信息的 Promise
 */
export function getPartySecretaryStatistics() {
  return request({
    url: "/strategy/villageTeam/partySecretaryStatistics",
    method: "get",
  });
}

/**
 * 获取两委班子成员统计信息
 * @returns {Promise} 包含两委班子成员统计信息的 Promise
 */
export function getCommitteeMemberStatistics() {
  return request({
    url: "/strategy/villageTeam/committeeMemberStatistics",
    method: "get",
  });
}

/**
 * 获取后备干部统计信息
 * @returns {Promise} 包含后备干部统计信息的 Promise
 */
export function getReserveCadreStatistics() {
  return request({
    url: "/strategy/villageTeam/reserveCadreStatistics",
    method: "get",
  });
}

/**
 * 获取离任干部统计信息
 * @returns {Promise} 包含离任干部统计信息的 Promise
 */
export function getRetiredCadreStatistics() {
  return request({
    url: "/strategy/villageTeam/retiredCadreStatistics",
    method: "get",
  });
}

/**
 * 获取网格队伍统计信息
 * @returns {Promise} 包含网格队伍统计信息的 Promise
 */
export function getGridTeamStatistics() {
  return request({
    url: "/strategy/villageTeam/gridTeamStatistics",
    method: "get",
  });
}
