/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    // The guarantee taken at face value: the answer is the one value whose
    // tally passes n / 2, so count occurrences per distinct value and report
    // the first tally to cross that line.
    const counts = new Map();
    const half = Math.floor(nums.length / 2);
    for (const value of nums) {
        const tally = (counts.get(value) || 0) + 1;
        counts.set(value, tally);
        // No rival can catch a tally already past half: two values cannot
        // both own more than half the positions.
        if (tally > half) {
            return value;
        }
    }
    // A majority is promised, so the sweep always returns mid-loop.
    throw new Error("unreachable: a majority is promised");
};
