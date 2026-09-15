impl Solution {
    pub fn max_sum(nums: Vec<i32>, k: i32, m: i32) -> i32 {
        const NEG: i64 = i64::MIN / 4; // sentinel far below any reachable value
        let n = nums.len();
        let m = m as usize;
        let mut prefix = vec![0i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + nums[i] as i64;
        }
        // dp over rows: prev[j] = best sum of (i-1) subarrays within first j elements
        let mut prev = vec![0i64; n + 1]; // i = 0
        for _ in 1..=k {
            let mut cur = vec![NEG; n + 1];
            let mut best = NEG; // running max of prev[t] - prefix[t] for t <= j - m
            for j in 1..=n {
                if j >= m {
                    let t = j - m;
                    let cand = prev[t] - prefix[t];
                    if cand > best {
                        best = cand;
                    }
                }
                if best != NEG {
                    let val = prefix[j] + best;
                    cur[j] = if cur[j - 1] > val { cur[j - 1] } else { val };
                } else {
                    cur[j] = cur[j - 1];
                }
            }
            prev = cur;
        }
        prev[n] as i32
    }
}
