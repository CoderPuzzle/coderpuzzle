// Both inputs are sorted by id, so two pointers walk them in lockstep,
// always emitting the smaller head id next: shared ids merge their values,
// single-side ids pass through unchanged. The result is sorted by
// construction and holds each id once.
function mergeArrays(nums1: number[][], nums2: number[][]): number[][] {
    const merged: number[][] = [];
    let i = 0;
    let j = 0;
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i][0] === nums2[j][0]) {
            merged.push([nums1[i][0], nums1[i][1] + nums2[j][1]]);
            ++i;
            ++j;
        } else if (nums1[i][0] < nums2[j][0]) {
            merged.push([...nums1[i]]);
            ++i;
        } else {
            merged.push([...nums2[j]]);
            ++j;
        }
    }
    // One tail is empty here; the other carries its remaining rows.
    for (; i < nums1.length; ++i) merged.push([...nums1[i]]);
    for (; j < nums2.length; ++j) merged.push([...nums2[j]]);
    return merged;
}
