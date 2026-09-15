impl Solution {
    pub fn combination_sum(candidates: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
        fn backtrack(
            candidates: &[i32],
            start: usize,
            remaining: i32,
            path: &mut Vec<i32>,
            results: &mut Vec<Vec<i32>>,
        ) {
            // remaining = target minus the sum of the path so far; when it hits 0
            // the path is a valid combination, so record a clone before it mutates.
            if remaining == 0 {
                results.push(path.clone());
                return;
            }
            // Loop from start onward: everything before start stays forbidden.
            for i in start..candidates.len() {
                let value = candidates[i];
                // Oversized candidate: let the branch die now rather than one
                // layer deeper. A skip, not a break, since input is unsorted.
                if value > remaining {
                    continue;
                }
                path.push(value);
                // Recurse with i, not i + 1: a candidate may be reused without
                // limit. This pins every combination to nondecreasing candidate
                // order, so (2, 3, 2) can never form while (2, 2, 3) is found once.
                backtrack(candidates, i, remaining - value, path, results);
                path.pop();
            }
        }
        let mut results = Vec::new();
        let mut path = Vec::new();
        backtrack(&candidates, 0, target, &mut path, &mut results);
        results
    }
}
