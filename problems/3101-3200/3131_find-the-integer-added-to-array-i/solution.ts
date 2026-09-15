function addedInteger(nums1: number[], nums2: number[]): number {
    // Adding one constant x to every element of nums1 shifts its minimum by
    // exactly x, so x = min(nums2) - min(nums1) is forced; the input
    // guarantee promises that this x reproduces nums2's multiset, and any
    // pair admitting some x admits only one. Values stay in [-1000, 1000].
    let lo1 = Infinity;
    let lo2 = Infinity;
    for (let i = 0; i < nums1.length; i++) {
        if (nums1[i] < lo1) {
            lo1 = nums1[i];
        }
        if (nums2[i] < lo2) {
            lo2 = nums2[i];
        }
    }
    return lo2 - lo1;
}
