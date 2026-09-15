impl Solution {
    pub fn merge_arrays(nums1: Vec<Vec<i32>>, nums2: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // Both inputs are sorted by id, so two pointers walk them in
        // lockstep, always emitting the smaller head id next: shared ids
        // merge their values, single-side ids pass through unchanged. The
        // result is sorted by construction and holds each id once.
        let mut merged: Vec<Vec<i32>> = Vec::new();
        let mut i = 0usize;
        let mut j = 0usize;
        while i < nums1.len() && j < nums2.len() {
            if nums1[i][0] == nums2[j][0] {
                merged.push(vec![nums1[i][0], nums1[i][1] + nums2[j][1]]);
                i += 1;
                j += 1;
            } else if nums1[i][0] < nums2[j][0] {
                merged.push(nums1[i].clone());
                i += 1;
            } else {
                merged.push(nums2[j].clone());
                j += 1;
            }
        }
        // One tail is empty here; the other carries its remaining rows.
        for row in &nums1[i..] {
            merged.push(row.clone());
        }
        for row in &nums2[j..] {
            merged.push(row.clone());
        }
        merged
    }
}
