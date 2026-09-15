impl Solution {
    pub fn optimal_division(nums: Vec<i32>) -> String {
        // One or two values leave nothing to regroup, so the bare
        // left-to-right join is the whole answer. From three on, every value
        // is positive and the expression is maximized by dividing nums[0] by
        // the smallest possible denominator — the flat chain
        // a1/a2/.../an-1 = a1/(a2*...*an-1), which pulls every later value
        // into that denominator's numerator.
        let parts: Vec<String> = nums.iter().map(|value| value.to_string()).collect();
        if parts.len() <= 2 {
            return parts.join("/");
        }
        format!("{}/({})", parts[0], parts[1..].join("/"))
    }
}
