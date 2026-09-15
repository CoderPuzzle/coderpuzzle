impl Solution {
    // Two pointers: as i grows, nums1[i] shrinks, so the farthest usable j
    // never moves left. Advance j as far as validity allows.
    pub fn max_distance(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        let mut best = 0usize;
        let mut j = 0usize;
        for (i, &v) in nums1.iter().enumerate() {
            while j < nums2.len() && (j < i || nums2[j] >= v) {
                j += 1;
            }
            if j > i && nums2[j - 1] >= v {
                best = best.max(j - 1 - i);
            }
        }
        best as i32
    }
}
