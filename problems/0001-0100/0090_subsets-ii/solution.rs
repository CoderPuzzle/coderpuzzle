impl Solution {
    pub fn subsets_with_dup(mut nums: Vec<i32>) -> Vec<Vec<i32>> {
        // Sort in place (we own the vec): each branch chooses among the
        // remaining values in ascending order, so the subsets emerge in the
        // pinned ascending lexicographic order.
        nums.sort_unstable();
        let mut subsets: Vec<Vec<i32>> = Vec::new();
        let mut current: Vec<i32> = Vec::new();
        Self::backtrack(&nums, 0, &mut current, &mut subsets);
        subsets
    }

    fn backtrack(nums: &[i32], start: usize, current: &mut Vec<i32>, subsets: &mut Vec<Vec<i32>>) {
        // Every node of the walk is itself a subset: the root is [].
        subsets.push(current.clone());
        for i in start..nums.len() {
            // A value equal to the sibling just tried at this level would
            // rebuild the same subset, so skip runs of equal values: a
            // duplicate may only open a branch as the first of its run.
            if i > start && nums[i] == nums[i - 1] {
                continue;
            }
            current.push(nums[i]);
            Self::backtrack(nums, i + 1, current, subsets);
            current.pop();
        }
    }
}
