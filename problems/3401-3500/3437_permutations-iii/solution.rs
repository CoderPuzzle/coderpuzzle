impl Solution {
    pub fn permute(n: i32) -> Vec<Vec<i32>> {
        let mut results = Vec::new();
        let mut current = Vec::with_capacity(n as usize);
        // One flag per value: each of 1..n is consumed at most once per
        // permutation, cleared again on the way back up.
        let mut used = vec![false; n as usize + 1];
        walk(n, &mut current, &mut used, &mut results);
        results
    }
}

// Ascending candidates make the walk emit lexicographic order directly; the
// parity test prunes a branch the moment it would place two adjacent elements
// both odd or both even.
fn walk(n: i32, current: &mut Vec<i32>, used: &mut Vec<bool>, results: &mut Vec<Vec<i32>>) {
    // Every position filled: snapshot the finished permutation.
    if current.len() == n as usize {
        // Copy: current is the shared buffer for the next branch.
        results.push(current.clone());
        return;
    }
    for value in 1..=n {
        if used[value as usize] {
            continue;
        }
        if let Some(&last) = current.last() {
            if value % 2 == last % 2 {
                continue;
            }
        }
        used[value as usize] = true;
        current.push(value);
        walk(n, current, used, results);
        current.pop();
        used[value as usize] = false;
    }
}
