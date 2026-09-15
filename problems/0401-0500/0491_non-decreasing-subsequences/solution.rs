use std::collections::HashSet;

impl Solution {
    // One decision per index — take the value or skip it — so every leaf of
    // the tree is exactly one subset of indices. A leaf holding at least two
    // non-decreasing values is one answer; equal values reach the same value
    // sequence through different index subsets, so a set absorbs those
    // duplicates. Sorting the collected vectors emits the pinned
    // lexicographic order — Vec<i32> compares element by element, shorter
    // prefixes first.
    pub fn find_subsequences(nums: Vec<i32>) -> Vec<Vec<i32>> {
        let mut found: HashSet<Vec<i32>> = HashSet::new();
        let mut current: Vec<i32> = Vec::new();
        Self::walk(&nums, 0, &mut current, &mut found);
        let mut results: Vec<Vec<i32>> = found.into_iter().collect();
        results.sort();
        results
    }

    fn walk(nums: &[i32], index: usize, current: &mut Vec<i32>, found: &mut HashSet<Vec<i32>>) {
        if index == nums.len() {
            if current.len() >= 2 {
                found.insert(current.clone());
            }
            return;
        }
        // Take nums[index] when it does not decrease.
        if current.last().map_or(true, |&last| nums[index] >= last) {
            current.push(nums[index]);
            Self::walk(nums, index + 1, current, found);
            current.pop();
        }
        // Skip nums[index].
        Self::walk(nums, index + 1, current, found);
    }
}
