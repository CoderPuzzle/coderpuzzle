impl Solution {
    pub fn is_good(nums: Vec<i32>) -> bool {
        // A permutation of base[m] has maximum m and length m + 1, so the
        // maximum leaves exactly one candidate array to match. Sort a copy
        // of nums and compare it against the literally constructed
        // [1, ..., m - 1, m, m]. For m = 1 the ascending range is empty and
        // the expected array is just [1, 1], which is base[1] itself.
        let largest = *nums.iter().max().unwrap();
        if nums.len() != (largest + 1) as usize {
            // base[m] has length m + 1; a disagreement rules out every base.
            return false;
        }
        let mut expected: Vec<i32> = (1..largest).collect();
        expected.push(largest);
        expected.push(largest);
        let mut sorted_nums = nums.clone();
        sorted_nums.sort();
        sorted_nums == expected
    }
}
