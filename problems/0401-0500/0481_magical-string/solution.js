/**
 * @param {number} n
 * @return {number}
 */
var magicalString = function (n) {
    // The string is its own run-length encoding: grouping it into
    // runs of equal characters yields lengths that spell the string
    // again ("1 22 11 2 ..." → lengths "1 2 2 1 ..."). Seed the
    // prefix 1, 2, 2; a read pointer walks that prefix as the count
    // sequence while a write pointer appends s[read] copies of the
    // flip character, which alternates between 1 and 2 from group to
    // group. Generate until n elements exist, then count the 1s in
    // the first n.
    const s = [1, 2, 2];
    let read = 2;
    let flip = 1;
    while (s.length < n) {
        const count = s[read];
        for (let i = 0; i < count; i++) {
            s.push(flip);
        }
        flip = 3 - flip;
        read += 1;
    }
    let ones = 0;
    for (let i = 0; i < n; i++) {
        if (s[i] === 1) {
            ones += 1;
        }
    }
    return ones;
};
