/**
 * @param {number[]} nums
 * @return {number[]}
 */
var recoverArray = function (nums) {
    const values = nums.slice().sort((a, b) => a - b);
    const targetLength = values.length / 2;
    for (let candidateIndex = 1; candidateIndex < values.length; candidateIndex++) {
        const difference = values[candidateIndex] - values[0];
        if (difference <= 0 || difference % 2 !== 0) {
            continue;
        }

        const counts = new Map();
        for (const value of values) {
            counts.set(value, (counts.get(value) || 0) + 1);
        }
        const recovered = [];
        for (const lower of values) {
            if ((counts.get(lower) || 0) === 0) {
                continue;
            }
            const higher = lower + difference;
            if ((counts.get(higher) || 0) === 0) {
                break;
            }
            counts.set(lower, counts.get(lower) - 1);
            counts.set(higher, counts.get(higher) - 1);
            recovered.push(lower + difference / 2);
        }
        if (recovered.length === targetLength) {
            return recovered;
        }
    }
    return [];
};
