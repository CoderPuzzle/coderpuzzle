impl Solution {
    pub fn get_common(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        // Both arrays ascend, so the front runner carrying the smaller
        // value can never match anything ahead on the other side: drop it
        // and repeat. The first tie is necessarily the smallest shared
        // value; a drained side proves no common element exists.
        let (mut i, mut j) = (0usize, 0usize);
        while i < nums1.len() && j < nums2.len() {
            if nums1[i] == nums2[j] {
                return nums1[i];
            }
            if nums1[i] < nums2[j] {
                i += 1;
            } else {
                j += 1;
            }
        }
        -1
    }
}
