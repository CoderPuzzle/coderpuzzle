impl Solution {
    pub fn minimum_moves(nums: Vec<i32>, k: i32, maxChanges: i32) -> i64 {
        // 1-indexed positions of ones
        let mut ones: Vec<i64> = vec![0];
        let mut prefix: Vec<i64> = vec![0];
        for (i, &v) in nums.iter().enumerate() {
            if v != 0 {
                ones.push(i as i64);
                prefix.push(*prefix.last().unwrap() + i as i64);
            }
        }
        let m = (ones.len() - 1) as i64;
        let inf: i64 = 1i64 << 60;

        let window_cost = |t: i64| -> i64 {
            if t == 0 {
                return 0;
            }
            if t > m {
                return inf;
            }
            let mut best = inf;
            let mut l: i64 = 1;
            while l <= m - t + 1 {
                let r = l + t - 1;
                let pos = (l + r) / 2;
                let left_cnt = pos - l;
                let right_cnt = r - pos;
                let left = left_cnt * ones[pos as usize] - (prefix[(pos - 1) as usize] - prefix[(l - 1) as usize]);
                let right = (prefix[r as usize] - prefix[pos as usize]) - right_cnt * ones[pos as usize];
                let cost = left + right;
                if cost < best {
                    best = cost;
                }
                l += 1;
            }
            best
        };

        let total = |t: i64| -> i64 {
            let wc = window_cost(t);
            if wc == inf {
                return inf;
            }
            wc + 2 * (k as i64 - t)
        };

        let mut lo: i64 = ((k - maxChanges) as i64).max(0);
        let mut hi: i64 = (k as i64).min(m);
        if lo > hi {
            return 0;
        }
        while hi - lo > 4 {
            let m1 = lo + (hi - lo) / 3;
            let m2 = hi - (hi - lo) / 3;
            if total(m1) <= total(m2) {
                hi = m2;
            } else {
                lo = m1;
            }
        }
        let mut ans = inf;
        let mut t = lo;
        while t <= hi {
            let v = total(t);
            if v < ans {
                ans = v;
            }
            t += 1;
        }
        ans
    }
}
