/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    // Sorted copy: the majority's occurrences stand together as one run
    // longer than half the array, and a run that long must cover the
    // middle -- so the value at the halfway index is the majority,
    // whatever the input order was.
    const ordered = [...nums].sort((a, b) => a - b);
    return ordered[Math.floor(ordered.length / 2)];
};
