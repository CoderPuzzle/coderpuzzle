/**
 * @param {number[]} nums
 * @return {number}
 */
var singleDivisorTriplet = function (nums) {
    const freq = new Array(101).fill(0);
    for (const num of nums) {
        freq[num]++;
    }
    const values = [];
    for (let v = 1; v <= 100; v++) {
        if (freq[v] > 0) {
            values.push(v);
        }
    }
    let total = 0;
    for (let i = 0; i < values.length; i++) {
        const a = values[i];
        for (let j = i; j < values.length; j++) {
            const b = values[j];
            for (let k = j; k < values.length; k++) {
                const c = values[k];
                const s = a + b + c;
                // divisibility is checked per index, so repeated
                // values contribute one hit per copy
                const hits = (s % a === 0 ? 1 : 0) + (s % b === 0 ? 1 : 0) + (s % c === 0 ? 1 : 0);
                if (hits !== 1) {
                    continue;
                }
                if (a === b && b === c) {
                    const f = freq[a];
                    total += f * (f - 1) * (f - 2);
                } else if (a === b || b === c) {
                    const twice = a === b ? a : b;
                    const once = a === b ? c : a;
                    const f = freq[twice];
                    total += ((f * (f - 1)) / 2) * freq[once] * 6;
                } else {
                    total += freq[a] * freq[b] * freq[c] * 6;
                }
            }
        }
    }
    return total;
};
