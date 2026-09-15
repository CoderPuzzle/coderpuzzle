impl Solution {
    pub fn permute(nums: Vec<i32>) -> Vec<Vec<i32>> {
        // Sorted candidates make the walk emit lexicographic order directly;
        // the input vector is owned, so sorting it in place is safe.
        let mut values = nums;
        values.sort();
        let mut permutations = Vec::new();
        let mut current = Vec::with_capacity(values.len());
        let mut used = vec![false; values.len()];
        walk(&values, &mut used, &mut current, &mut permutations);
        permutations
    }
}

// A leaf has one chosen element per position: a full permutation. Marks
// replace an O(n) membership scan.
fn walk(values: &[i32], used: &mut [bool], current: &mut Vec<i32>, permutations: &mut Vec<Vec<i32>>) {
    if current.len() == values.len() {
        // Copy: current is the shared buffer for the next branch.
        permutations.push(current.clone());
        return;
    }
    for index in 0..values.len() {
        if used[index] {
            continue;
        }
        used[index] = true;
        current.push(values[index]);
        walk(values, used, current, permutations);
        current.pop();
        used[index] = false;
    }
}
