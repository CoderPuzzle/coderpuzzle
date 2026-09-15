/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
    // Sort both arrays ascending, then walk them with one index each: the
    // smaller current value can no longer be matched and advances alone,
    // while equal currents are a shared copy — both advance together, so
    // every value joins exactly min(count1, count2) times.
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);
    const picked = [];
    let i = 0;
    let j = 0;
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] === nums2[j]) {
            picked.push(nums1[i]);
            i++;
            j++;
        } else if (nums1[i] < nums2[j]) {
            i++;
        } else {
            j++;
        }
    }
    // The walk visits values in ascending order, so the picks leave the
    // loop already in the ascending order the judge requires.
    return picked;
};
