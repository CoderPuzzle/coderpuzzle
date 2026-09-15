impl Solution {
    pub fn permute_unique(mut nums: Vec<i32>) -> Vec<Vec<i32>> {
        // Sort in place (we own the vec): every position chooses among the
        // remaining values in ascending order, so the finished permutations
        // emerge in lexicographic order.
        nums.sort_unstable();
        let mut permutations: Vec<Vec<i32>> = Vec::new();
        let mut current: Vec<i32> = Vec::new();
        // One flag per slot: each element is consumed at most once per
        // permutation, cleared again on the way back up.
        let mut used = vec![false; nums.len()];
        Self::backtrack(&nums, &mut used, &mut current, &mut permutations);
        permutations
    }

    fn backtrack(nums: &[i32], used: &mut Vec<bool>, current: &mut Vec<i32>, permutations: &mut Vec<Vec<i32>>) {
        if current.len() == nums.len() {
            // Every position filled: snapshot the finished permutation.
            permutations.push(current.clone());
            return;
        }
        for i in 0..nums.len() {
            if used[i] {
                continue;
            }
            // A value equal to the one just abandoned at this depth would
            // rebuild the same permutation, so skip runs of equal values: a
            // duplicate may only be placed once its left twin is used.
            if i > 0 && nums[i] == nums[i - 1] && !used[i - 1] {
                continue;
            }
            used[i] = true;
            current.push(nums[i]);
            Self::backtrack(nums, used, current, permutations);
            current.pop();
            used[i] = false;
        }
    }
}
