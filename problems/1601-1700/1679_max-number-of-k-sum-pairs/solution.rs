use std::collections::HashMap;

impl Solution {
    // An operation always consumes one x and one k - x, so the answer
    // depends only on how often each value occurs. For x below its
    // complement the pair count is capped by the scarcer side, giving
    // min(count(x), count(k - x)); when k is even, x = k / 2 is its own
    // complement and pairs with itself count(x) / 2 times. Comparing x
    // with k - x directly, never summing two values, keeps every
    // intermediate inside 32 bits.
    pub fn max_operations(nums: Vec<i32>, k: i32) -> i32 {
        let mut count: HashMap<i32, i32> = HashMap::new();
        for &value in &nums {
            *count.entry(value).or_insert(0) += 1;
        }
        let mut ops = 0;
        for (&x, &c) in &count {
            let complement = k - x;
            if x < complement {
                ops += c.min(count.get(&complement).copied().unwrap_or(0));
            } else if x == complement {
                ops += c / 2;
            }
        }
        ops
    }
}
