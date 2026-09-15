impl Solution {
    pub fn simulation_result(windows: Vec<i32>, queries: Vec<i32>) -> Vec<i32> {
        // The final stack lists windows by their most recent last touch,
        // with never-queried windows keeping their original order below.
        // Reading the queries backwards and appending each window not yet
        // appended emits exactly that: last touches newest-first, earlier
        // presses skipped because only the final press sets a window's
        // height. The second pass over windows appends the untouched rest
        // in its original order.
        let mut seen = vec![false; windows.len() + 1];
        let mut result = Vec::with_capacity(windows.len());
        for &query in queries.iter().rev() {
            if !seen[query as usize] {
                seen[query as usize] = true;
                result.push(query);
            }
        }
        for &window in &windows {
            if !seen[window as usize] {
                seen[window as usize] = true;
                result.push(window);
            }
        }
        result
    }
}
