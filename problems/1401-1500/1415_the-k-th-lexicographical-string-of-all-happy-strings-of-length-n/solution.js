/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getHappyString = function (n, k) {
    const total = 3 * (1 << (n - 1));
    if (k > total) {
        return "";
    }
    const letters = ["a", "b", "c"];
    let result = "";
    let block = total / 3;
    let rank = k - 1;
    for (let i = 0; i < n; i++) {
        let candidates;
        if (i === 0) {
            candidates = letters;
        } else {
            const previous = result[result.length - 1];
            candidates = letters.filter((c) => c !== previous);
        }
        const index = Math.floor(rank / block);
        rank %= block;
        result += candidates[index];
        block = Math.floor(block / 2);
    }
    return result;
};
