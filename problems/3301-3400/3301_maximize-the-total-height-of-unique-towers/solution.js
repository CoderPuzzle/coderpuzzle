/**
 * @param {number[]} maximumHeight
 * @return {number}
 */
var maximumTotalSum = function (maximumHeight) {
    // Sorting descending makes the distinctness bound exact position by
    // position: once the previous tower took height prev, no later tower
    // may take anything above prev - 1, so each assigned height is
    // min(cap, prev - 1); falling below 1 means some prefix demands more
    // distinct positive integers than exist up to the largest cap, and no
    // rearrangement helps. Totals reach 10^14, exact in doubles.
    maximumHeight.sort((a, b) => b - a);
    let total = 0;
    let prev = Number.MAX_SAFE_INTEGER + 1;
    for (const cap of maximumHeight) {
        const height = Math.min(cap, prev - 1);
        if (height < 1) {
            return -1;
        }
        total += height;
        prev = height;
    }
    return total;
};
