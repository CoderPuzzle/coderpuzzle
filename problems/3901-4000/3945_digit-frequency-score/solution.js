/**
 * @param {number} n
 * @return {number}
 */
var digitFrequencyScore = function (n) {
    let answer = 0;
    while (n > 0) {
        answer += n % 10;
        n = Math.floor(n / 10);
    }
    return answer;
};
