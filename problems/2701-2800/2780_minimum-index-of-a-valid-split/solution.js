/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumIndex = function (nums) {
    // One pass tallies every value; the promised sole dominant is the value
    // whose tally ends largest. Only the dominant can anchor a valid split:
    // a value dominating both halves holds more than half of each, and
    // doubling and adding the two inequalities gives more than half of the
    // whole array.
    const counts = new Map();
    let dominant = nums[0];
    let frequency = 0;
    for (const num of nums) {
        const tally = (counts.get(num) || 0) + 1;
        counts.set(num, tally);
        if (tally > frequency) {
            dominant = num;
            frequency = tally;
        }
    }
    // Second sweep carries prefix, the count of dominant copies so far.
    // Splitting after i, the prefix holds i + 1 elements and the suffix
    // n - i - 1; both comparisons are strict, so a tally tying its half's
    // length does not dominate.
    let prefix = 0;
    const n = nums.length;
    for (let i = 0; i < n - 1; i++) {
        if (nums[i] === dominant) {
            prefix++;
        }
        if (prefix * 2 > i + 1 && (frequency - prefix) * 2 > n - i - 1) {
            return i;
        }
    }
    return -1;
};
