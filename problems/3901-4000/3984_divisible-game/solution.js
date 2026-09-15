/**
 * @param {number[]} nums
 * @return {number}
 */
var divisibleGame = function (nums) {
    const modulus = 1000000007;
    const candidates = new Set([2]);
    for (const value of nums) {
        for (let divisor = 2; divisor * divisor <= value; divisor++) {
            if (value % divisor === 0) {
                candidates.add(divisor);
                candidates.add(Math.floor(value / divisor));
            }
        }
        if (value > 1) candidates.add(value);
    }

    let bestScore = -Infinity;
    let bestK = 0;
    for (const k of candidates) {
        let score = -Infinity;
        let current = 0;
        for (const value of nums) {
            const transformed = value % k === 0 ? value : -value;
            current = Math.max(transformed, current + transformed);
            score = Math.max(score, current);
        }
        if (score > bestScore || (score === bestScore && k < bestK)) {
            bestScore = score;
            bestK = k;
        }
    }
    const normalized = ((BigInt(bestScore) % BigInt(modulus)) + BigInt(modulus)) % BigInt(modulus);
    return Number((normalized * BigInt(bestK)) % BigInt(modulus));
};
