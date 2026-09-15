impl Solution {
    pub fn intersect(nums1: Vec<i32>, nums2: Vec<i32>) -> Vec<i32> {
        // Sort both arrays ascending, then walk them with one index each:
        // the smaller current value can no longer be matched and advances
        // alone, while equal currents are a shared copy — both advance
        // together, so every value joins exactly min(count1, count2) times.
        let mut nums1 = nums1;
        let mut nums2 = nums2;
        nums1.sort_unstable();
        nums2.sort_unstable();
        let mut picked: Vec<i32> = Vec::new();
        let mut i = 0usize;
        let mut j = 0usize;
        while i < nums1.len() && j < nums2.len() {
            if nums1[i] == nums2[j] {
                picked.push(nums1[i]);
                i += 1;
                j += 1;
            } else if nums1[i] < nums2[j] {
                i += 1;
            } else {
                j += 1;
            }
        }
        // The walk visits values in ascending order, so the picks leave the
        // loop already in the ascending order the judge requires.
        picked
    }
}
