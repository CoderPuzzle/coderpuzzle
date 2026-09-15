use std::collections::HashSet;

impl Solution {
    pub fn find_intersection_values(nums1: Vec<i32>, nums2: Vec<i32>) -> Vec<i32> {
        // answer1 counts indices whose value exists anywhere in the other
        // array; existence, not multiplicity, is what matters, so the only
        // state needed is each array's set of distinct values.
        let set1: HashSet<i32> = nums1.iter().copied().collect();
        let set2: HashSet<i32> = nums2.iter().copied().collect();
        let answer1 = nums1.iter().filter(|x| set2.contains(x)).count() as i32;
        let answer2 = nums2.iter().filter(|y| set1.contains(y)).count() as i32;
        vec![answer1, answer2]
    }
}
