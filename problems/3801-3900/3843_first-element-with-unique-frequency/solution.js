/**
 * @param {number[]} nums
 * @return {number}
 */
var firstUniqueFreq = function (nums) {
    // Values, frequencies, and counts of frequencies are all at most 1e5,
    // so plain numbers hold every integer here exactly, far inside 2^53.
    const freq = new Map();
    for (const x of nums) {
        freq.set(x, (freq.get(x) || 0) + 1);
    }
    // freqCount maps each frequency to how many distinct values share it; a
    // value's frequency is unique exactly when freqCount.get(freq[x]) === 1.
    const freqCount = new Map();
    for (const f of freq.values()) {
        freqCount.set(f, (freqCount.get(f) || 0) + 1);
    }
    // Scan in index order: the first element whose value has a unique
    // frequency wins, even if a "smaller" qualifying value appears later.
    for (const x of nums) {
        if (freqCount.get(freq.get(x)) === 1) {
            return x;
        }
    }
    return -1;
};
