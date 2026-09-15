impl Solution {
    // run1/run2: longest non-decreasing run ending exactly at this index,
    // choosing nums1[i] / nums2[i]. Each transition compares against both
    // previous picks under >=, so a run may switch source arrays anywhere.
    pub fn max_non_decreasing_length(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        let mut run1 = 1;
        let mut run2 = 1;
        let mut best = 1;
        for i in 1..nums1.len() {
            let mut next1 = 1;
            if nums1[i] >= nums1[i - 1] {
                next1 = next1.max(run1 + 1);
            }
            if nums1[i] >= nums2[i - 1] {
                next1 = next1.max(run2 + 1);
            }
            let mut next2 = 1;
            if nums2[i] >= nums1[i - 1] {
                next2 = next2.max(run1 + 1);
            }
            if nums2[i] >= nums2[i - 1] {
                next2 = next2.max(run2 + 1);
            }
            run1 = next1;
            run2 = next2;
            best = best.max(next1.max(next2));
        }
        best
    }
}
