/**
 * @param {number[]} nums
 * @return {number}
 */
var countPairs = function (nums) {
    // The family of a value holds every number reachable by
    // exchanging two of its digits at most once, itself included;
    // swapped strings parse back through Number, so leading zeros
    // collapse (30 -> "03" -> 3). A pair qualifies when either side
    // sits in the other's family; one swap may touch one number
    // only, so both directions are tested.
    const family = (value) => {
        const digits = String(value).split("");
        const reached = new Set([value]);
        for (let p = 0; p < digits.length; p++) {
            for (let q = p + 1; q < digits.length; q++) {
                const swapped = digits.slice();
                [swapped[p], swapped[q]] = [swapped[q], swapped[p]];
                reached.add(Number(swapped.join("")));
            }
        }
        return reached;
    };
    const families = nums.map(family);
    let pairs = 0;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (families[i].has(nums[j]) || families[j].has(nums[i])) {
                pairs++;
            }
        }
    }
    return pairs;
};
