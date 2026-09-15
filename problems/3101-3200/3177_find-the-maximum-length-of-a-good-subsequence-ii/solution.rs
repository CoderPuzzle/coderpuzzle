use std::collections::HashMap;

impl Solution {
    pub fn maximum_length(nums: Vec<i32>, k: i32) -> i32 {
        // remap values to compact ids
        let mut mapping: HashMap<i32, usize> = HashMap::new();
        let mut remapped: Vec<usize> = Vec::with_capacity(nums.len());
        for &x in &nums {
            let next = mapping.len();
            let id = *mapping.entry(x).or_insert(next);
            remapped.push(id);
        }
        let v = mapping.len();
        let k = k as usize;

        // dp[j][x] = max length of a good subsequence ending with value x
        // having exactly j transitions
        let mut dp = vec![vec![0i32; v]; k + 1];
        let mut best1 = vec![0i32; k + 1]; // max over x of dp[j][x]
        let mut val1 = vec![-1i64; k + 1]; // argmax
        let mut best2 = vec![0i32; k + 1]; // second max over x != val1

        for &x in &remapped {
            let mut cand = vec![0i32; k + 1];
            for j in 0..=k {
                let mut c = dp[j][x] + 1; // extend a same-value subsequence
                if j > 0 {
                    let top = if val1[j - 1] != x as i64 {
                        best1[j - 1]
                    } else {
                        best2[j - 1]
                    };
                    let diff = top + 1; // append after a different value
                    if diff > c {
                        c = diff;
                    }
                }
                if j == 0 && 1 > c {
                    c = 1;
                }
                cand[j] = c;
            }
            for j in 0..=k {
                let nv = cand[j];
                if nv <= dp[j][x] {
                    continue;
                }
                dp[j][x] = nv;
                if val1[j] == x as i64 {
                    best1[j] = nv;
                } else if nv > best1[j] {
                    best2[j] = best1[j];
                    best1[j] = nv;
                    val1[j] = x as i64;
                } else if nv > best2[j] {
                    best2[j] = nv;
                }
            }
        }

        let mut ans = 0;
        for j in 0..=k {
            if best1[j] > ans {
                ans = best1[j];
            }
        }
        ans
    }
}
