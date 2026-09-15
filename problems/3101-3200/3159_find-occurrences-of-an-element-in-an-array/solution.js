/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @param {number} x
 * @return {number[]}
 */
var occurrencesOfElement = function (nums, queries, x) {
    // One sweep records every index where x occurs, in order. Query k
    // then reads straight off that list: the k-th occurrence exists
    // exactly when k does not overrun it. Indices are 1-based ranks
    // into a 0-based list, hence the k - 1.
    const positions = [];
    for (let index = 0; index < nums.length; ++index) {
        if (nums[index] === x) positions.push(index);
    }
    const total = positions.length;
    const answer = new Array(queries.length);
    for (let i = 0; i < queries.length; ++i) {
        const k = queries[i];
        answer[i] = k <= total ? positions[k - 1] : -1;
    }
    return answer;
};
