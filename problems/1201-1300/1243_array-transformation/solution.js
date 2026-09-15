/**
 * @param {number[]} arr
 * @return {number[]}
 */
var transformArray = function (arr) {
    let current = arr;
    while (true) {
        // Whole day from a snapshot: neighbors are yesterday's values.
        const next = [...current];
        for (let i = 1; i < current.length - 1; ++i) {
            if (current[i] < current[i - 1] && current[i] < current[i + 1]) {
                next[i] = current[i] + 1;
            } else if (current[i] > current[i - 1] && current[i] > current[i + 1]) {
                next[i] = current[i] - 1;
            }
        }
        if (next.every((v, i) => v === current[i])) return current;
        current = next;
    }
};
