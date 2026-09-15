impl Solution {
    pub fn final_value_after_operations(operations: Vec<String>) -> i32 {
        operations
            .iter()
            .map(|operation| if operation.as_bytes()[1] == b'+' { 1 } else { -1 })
            .sum()
    }
}
