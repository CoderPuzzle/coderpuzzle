/**
 * @param {number[]} security
 * @param {number} time
 * @return {number[]}
 */
var goodDaysToRobBank = function (security, time) {
    const n = security.length;
    const before = new Array(n).fill(0);
    const after = new Array(n).fill(0);
    for (let day = 1; day < n; day++) {
        if (security[day - 1] >= security[day]) before[day] = before[day - 1] + 1;
    }
    for (let day = n - 2; day >= 0; day--) {
        if (security[day] <= security[day + 1]) after[day] = after[day + 1] + 1;
    }
    const answer = [];
    for (let day = 0; day < n; day++) {
        if (before[day] >= time && after[day] >= time) answer.push(day);
    }
    return answer;
};
