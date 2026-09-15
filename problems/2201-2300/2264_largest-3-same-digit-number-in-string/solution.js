/**
 * @param {string} num
 * @return {string}
 */
var largestGoodInteger = function (num) {
    let best = "";
    for (let i = 2; i < num.length; i++) {
        if (num[i] === num[i - 1] && num[i] === num[i - 2]) {
            const candidate = num.slice(i - 2, i + 1);
            if (candidate > best) {
                best = candidate;
            }
        }
    }
    return best;
};
