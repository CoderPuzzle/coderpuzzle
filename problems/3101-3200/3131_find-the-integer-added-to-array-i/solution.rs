impl Solution {
    pub fn added_integer(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        // Adding one constant x to every element of nums1 shifts its minimum
        // by exactly x, so x = min(nums2) - min(nums1) is forced; the input
        // guarantee promises that this x reproduces nums2's multiset, and
        // any pair admitting some x admits only one. Values stay in
        // [-1000, 1000], inside 32-bit range.
        let lo1 = *nums1.iter().min().unwrap();
        let lo2 = *nums2.iter().min().unwrap();
        lo2 - lo1
    }
}
