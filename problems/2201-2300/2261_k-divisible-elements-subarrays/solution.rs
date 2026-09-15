use std::collections::HashSet;

impl Solution {
    pub fn count_distinct(nums: Vec<i32>, k: i32, p: i32) -> i32 {
        // dedup by content: the comma-joined string identifies a subarray
        let mut seen: HashSet<String> = HashSet::new();
        let n = nums.len();
        for i in 0..n {
            // for each left endpoint i, extend j, tracking the running count of
            // elements divisible by p
            let mut divisible: i32 = 0;
            let mut cur = String::new();
            for j in i..n {
                if nums[j] % p == 0 {
                    divisible += 1;
                }
                // the separator keeps [1,2] and [12] distinct
                if !cur.is_empty() {
                    cur.push(',');
                }
                cur.push_str(&nums[j].to_string());
                // over the limit: any longer extension stays over, so stop extending
                if divisible > k {
                    break;
                }
                seen.insert(cur.clone());
            }
        }
        seen.len() as i32
    }
}
