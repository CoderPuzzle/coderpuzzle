/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortColors = function (nums) {
    // With only three keys the multiset fixes the output, so tally each
    // color into a slot indexed by the value itself.
    const counts = [0, 0, 0];
    for (const value of nums) {
        counts[value] += 1;
    }
    // Overwrite pass: emitting blocks 0,1,2 in order partitions nums;
    // safe because the tally above already captured every element.
    let index = 0;
    for (let color = 0; color < 3; color++) {
        for (let c = 0; c < counts[color]; c++) {
            nums[index] = color;
            index += 1;
        }
    }
    return nums;
};
