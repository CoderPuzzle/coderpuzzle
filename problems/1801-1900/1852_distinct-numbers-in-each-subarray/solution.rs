use std::collections::HashMap;

impl Solution {
    // One frequency map slides with the window; the running count of values
    // whose frequency is nonzero is the answer per window.
    pub fn distinct_numbers(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let k = k as usize;
        let mut ans = Vec::with_capacity(nums.len() - k + 1);
        let mut freq: HashMap<i32, i32> = HashMap::new();
        let mut distinct = 0i32;
        for (i, &v) in nums.iter().enumerate() {
            let e = freq.entry(v).or_insert(0);
            *e += 1;
            if *e == 1 {
                distinct += 1;
            }
            if i >= k {
                let left = nums[i - k];
                let e = freq.get_mut(&left).unwrap();
                *e -= 1;
                if *e == 0 {
                    distinct -= 1;
                }
            }
            if i + 1 >= k {
                ans.push(distinct);
            }
        }
        ans
    }
}
