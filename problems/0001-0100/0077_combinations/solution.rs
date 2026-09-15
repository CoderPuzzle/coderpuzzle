impl Solution {
    pub fn combine(n: i32, k: i32) -> Vec<Vec<i32>> {
        let mut combinations = Vec::new();
        let mut current = Vec::with_capacity(k as usize);
        walk(n, k, 1, &mut current, &mut combinations);
        combinations
    }
}

// Ascending start values make each combination ascending and the walk emit
// lexicographic order directly.
fn walk(n: i32, k: i32, start: i32, current: &mut Vec<i32>, combinations: &mut Vec<Vec<i32>>) {
    // A full pick of k numbers is one combination.
    if current.len() == k as usize {
        // Copy: current is the shared buffer for the next branch.
        combinations.push(current.clone());
        return;
    }
    // The bound keeps only values that leave enough larger numbers to fill
    // the rest of the combination.
    let last = n - (k - current.len() as i32) + 1;
    for value in start..=last {
        current.push(value);
        walk(n, k, value + 1, current, combinations);
        current.pop();
    }
}
