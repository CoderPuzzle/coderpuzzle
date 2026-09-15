/**
 * @param {number} lo
 * @param {number} hi
 * @param {number} k
 * @return {number}
 */
var getKth = function (lo, hi, k) {
    // Memoized path replay: walk each value's Collatz chain, recording
    // the route until it lands on a value whose power is already known,
    // then back-fill the recorded path. Fully iterative, and shared
    // steps between values are computed once.
    const memo = new Map([[1, 0]]);
    const powerOf = (start) => {
        let x = start;
        const path = [];
        while (!memo.has(x)) {
            path.push(x);
            x = x % 2 === 0 ? x / 2 : 3 * x + 1;
        }
        let steps = memo.get(x);
        for (let i = path.length - 1; i >= 0; --i) {
            ++steps;
            memo.set(path[i], steps);
        }
        return steps;
    };
    const values = [];
    for (let value = lo; value <= hi; ++value) {
        values.push(value);
    }
    values.sort((a, b) => {
        const pa = powerOf(a);
        const pb = powerOf(b);
        if (pa !== pb) {
            return pa - pb;
        }
        return a - b;
    });
    return values[k - 1];
};
