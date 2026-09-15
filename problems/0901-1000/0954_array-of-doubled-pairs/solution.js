/**
 * @param {number[]} arr
 * @return {boolean}
 */
var canReorderDoubled = function (arr) {
    // A pair is (x, 2x), so the value of smallest absolute value has no
    // choice: its half is smaller in magnitude and cannot be waiting for
    // it, so every copy must claim a double. Walk the distinct values in
    // ascending absolute value, carrying each value's unclaimed copies
    // forward as a demand on its double; a demand that outruns the
    // supply, or aims at a value the array never held, makes the
    // pairing impossible. Zero is its own double, so its count must be
    // even.
    const count = new Map();
    for (const value of arr) {
        count.set(value, (count.get(value) ?? 0) + 1);
    }
    const values = [...count.keys()].sort((a, b) => Math.abs(a) - Math.abs(b));
    const need = new Map();
    for (const value of values) {
        if (value === 0) {
            if (count.get(0) % 2 !== 0) {
                return false;
            }
            continue;
        }
        const demanded = need.get(value) ?? 0;
        if (demanded > count.get(value)) {
            return false;
        }
        const extra = count.get(value) - demanded;
        if (extra > 0 && !count.has(2 * value)) {
            return false;
        }
        need.set(2 * value, (need.get(2 * value) ?? 0) + extra);
    }
    return true;
};
