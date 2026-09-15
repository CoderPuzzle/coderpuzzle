impl Solution {
    pub fn maximum_subarray_sum(nums: Vec<i32>, k: i32) -> i64 {
        // value -> minimum prefix sum P[i] for a start i
        let mut best: std::collections::HashMap<i64, i64> = std::collections::HashMap::new();
        best.insert(nums[0] as i64, 0);
        let mut prefix: i64 = 0;
        let mut ans: Option<i64> = None;
        let n = nums.len();
        let kk = k as i64;
        for j in 0..n {
            prefix += nums[j] as i64; // P[j+1]
            let v = nums[j] as i64;
            for &candidate in &[v - kk, v + kk] {
                if let Some(&b) = best.get(&candidate) {
                    let value = prefix - b;
                    if ans.is_none() || value > ans.unwrap() {
                        ans = Some(value);
                    }
                }
            }
            if j + 1 < n {
                let next = nums[j + 1] as i64;
                let better = match best.get(&next) {
                    Some(&b) => prefix < b,
                    None => true,
                };
                if better {
                    best.insert(next, prefix);
                }
            }
        }
        ans.unwrap_or(0)
    }
}
