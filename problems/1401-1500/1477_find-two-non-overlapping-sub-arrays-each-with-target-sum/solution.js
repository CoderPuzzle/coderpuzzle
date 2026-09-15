/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var minSumOfLengths = function (arr, target) {
    const n = arr.length;
    const INF = Number.MAX_SAFE_INTEGER;
    const best = new Array(n).fill(INF);
    let answer = INF;
    let bestSoFar = INF;
    let windowSum = 0;
    let left = 0;
    for (let right = 0; right < n; right++) {
        windowSum += arr[right];
        while (windowSum > target) {
            windowSum -= arr[left];
            left++;
        }
        if (windowSum === target) {
            const length = right - left + 1;
            if (left > 0 && best[left - 1] !== INF) {
                answer = Math.min(answer, best[left - 1] + length);
            }
            bestSoFar = Math.min(bestSoFar, length);
        }
        best[right] = bestSoFar;
    }
    return answer >= INF ? -1 : answer;
};
