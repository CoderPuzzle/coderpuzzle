impl Solution {
    pub fn largest_number(nums: Vec<i32>) -> String {
        let mut strs: Vec<String> = nums.iter().map(|n| n.to_string()).collect();
        // a precedes b exactly when b + a is lexicographically smaller than
        // a + b — numeric comparison is useless (3 must come before 30). A
        // sorted result admits no adjacent swap that enlarges the string.
        strs.sort_by(|a, b| format!("{}{}", b, a).cmp(&format!("{}{}", a, b)));
        let result = strs.concat();
        // Leading zero means every input was 0.
        if result.starts_with('0') {
            "0".to_string()
        } else {
            result
        }
    }
}
