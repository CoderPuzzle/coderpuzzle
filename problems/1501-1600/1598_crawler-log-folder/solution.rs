impl Solution {
    pub fn min_operations(logs: Vec<String>) -> i32 {
        // Track only the current depth: "../" backs up (never below the
        // main folder), "./" is a no-op, and any other entry descends
        // into a named child folder. The final depth is exactly the
        // number of "../" moves needed to return to the main folder.
        let mut depth = 0;
        for log in &logs {
            if log == "../" {
                depth = (depth - 1).max(0);
            } else if log == "./" {
                continue;
            } else {
                depth += 1;
            }
        }
        depth
    }
}
