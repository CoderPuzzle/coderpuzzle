// Scan left to right keeping a stack of settled elements; when the incoming
// value equals the top, merge them into their sum and keep cascading left
// while the new sum equals the new top — the final stack is the answer.
impl Solution {
    pub fn merge_adjacent(nums: Vec<i32>) -> Vec<i64> {
        let mut stack: Vec<i64> = Vec::with_capacity(nums.len());
        for &value in &nums {
            if stack.last() == Some(&(i64::from(value))) {
                let mut merged = stack.pop().unwrap() + i64::from(value);
                while stack.last() == Some(&merged) {
                    merged += stack.pop().unwrap();
                }
                stack.push(merged);
            } else {
                stack.push(i64::from(value));
            }
        }
        stack
    }
}
