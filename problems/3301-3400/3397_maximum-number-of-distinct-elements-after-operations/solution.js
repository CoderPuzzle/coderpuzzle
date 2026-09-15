/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxDistinctElements = function (nums, k) {
    // Each element may land anywhere in [v-k, v+k]; assigning the values in
    // sorted order leaves every element the smallest value that is still
    // free and inside its window, which never hurts later ones.
    const a = [...nums].sort((x, y) => x - y);
    let last = a[0] - k - 1;
    let count = 0;
    for (const v of a) {
        let target = v - k;
        if (target <= last) target = last + 1;
        if (target <= v + k) {
            last = target;
            ++count;
        }
    }
    return count;
};
