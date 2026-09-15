impl Solution {
    // Equalizing a window costs sum(|v - t|), minimized when t is a median.
    // A sliding window over a Fenwick tree (compressed values) yields every
    // x-window's cost in O(log n): kth finds the median and prefix count/sum
    // split the window about it. A rolling DP then picks k non-overlapping
    // windows.
    pub fn min_operations(nums: Vec<i32>, x: i32, k: i32) -> i64 {
        let n = nums.len();
        let x = x as usize;
        let k = k as usize;
        let mut vals = nums.clone();
        vals.sort_unstable();
        vals.dedup();
        let m = vals.len();

        let mut cnt = vec![0i64; m + 1];
        let mut sm = vec![0i64; m + 1];

        let win_count = n - x + 1;
        let mut costs = vec![0i64; win_count];
        let mut total: i64 = 0;
        for i in 0..n {
            let mut p = vals.binary_search(&nums[i]).unwrap() + 1;
            while p <= m {
                cnt[p] += 1;
                sm[p] += nums[i] as i64;
                p += p & p.wrapping_neg();
            }
            total += nums[i] as i64;
            if i >= x {
                let old = nums[i - x];
                let mut q = vals.binary_search(&old).unwrap() + 1;
                while q <= m {
                    cnt[q] -= 1;
                    sm[q] -= old as i64;
                    q += q & q.wrapping_neg();
                }
                total -= old as i64;
            }
            if i >= x - 1 {
                let kpos = (x + 1) / 2;
                let mut pos = 0usize;
                let mut acc = 0i64;
                let mut step = 1usize;
                while step << 1 <= m {
                    step <<= 1;
                }
                while step > 0 {
                    let nxt = pos + step;
                    if nxt <= m && acc + cnt[nxt] < kpos as i64 {
                        pos = nxt;
                        acc += cnt[nxt];
                    }
                    step >>= 1;
                }
                let mid_idx = pos + 1;
                let mut c = 0i64;
                let mut s = 0i64;
                let mut p = mid_idx;
                while p > 0 {
                    c += cnt[p];
                    s += sm[p];
                    p -= p & p.wrapping_neg();
                }
                let med = vals[mid_idx - 1] as i64;
                costs[i - x + 1] = med * c - s + (total - s) - med * (x as i64 - c);
            }
        }

        const INF: i64 = 1i64 << 60;
        let mut prev = vec![0i64; win_count]; // t = 0 windows: cost 0 everywhere
        for t in 1..=k {
            let mut cur = vec![INF; win_count];
            for i in 0..win_count {
                let mut best = if i > 0 { cur[i - 1] } else { INF };
                if t == 1 {
                    if costs[i] < best {
                        best = costs[i];
                    }
                } else if i >= x {
                    let take = costs[i] + prev[i - x];
                    if take < best {
                        best = take;
                    }
                }
                cur[i] = best;
            }
            prev = cur;
        }
        prev[win_count - 1]
    }
}
