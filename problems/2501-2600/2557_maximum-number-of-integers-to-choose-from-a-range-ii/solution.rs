impl Solution {
    pub fn max_count(banned: Vec<i32>, n: i32, max_sum: i64) -> i32 {
        // Smallest-first greedy computed gap by gap over the sorted,
        // de-duplicated bans: a free run of `avail` candidates starting
        // at `lo` costs avail*(2*lo+avail-1)/2 when swallowed whole. The
        // first run that cannot fit contains the answer's cutoff — every
        // later candidate is larger — so exactly one binary search caps
        // it and the walk stops there. Cost terms peak near avail*n ~
        // 3*10^18, inside the i64 range; the answer itself is
        // <= sqrt(2*max_sum) <= sqrt(2*10^15) ~ 4.5e7, far below 2^31.
        let mut seen = banned;
        seen.sort_unstable();
        seen.dedup();
        let ladder = |lo: i64, cnt: i64| -> i64 { cnt * (2 * lo + cnt - 1) / 2 };
        let mut budget = max_sum;
        let taken = {
            let best_prefix = |lo: i64, avail: i64, budget: i64| -> i64 {
                let mut low: i64 = 0;
                let mut high = avail;
                while low < high {
                    let mid = (low + high + 1) / 2;
                    if ladder(lo, mid) <= budget {
                        low = mid;
                    } else {
                        high = mid - 1;
                    }
                }
                low
            };
            let mut taken: i64 = 0;
            let mut prev: i64 = 0;
            let mut finished = false;
            for value in &seen {
                let value = *value as i64;
                let avail = value - prev - 1;
                if avail > 0 {
                    let lo = prev + 1;
                    let cost = ladder(lo, avail);
                    if cost <= budget {
                        taken += avail;
                        budget -= cost;
                    } else {
                        taken += best_prefix(lo, avail, budget);
                        finished = true;
                        break;
                    }
                }
                prev = value;
            }
            if !finished && (n as i64) > prev {
                let lo = prev + 1;
                let avail = n as i64 - prev;
                let cost = ladder(lo, avail);
                if cost <= budget {
                    taken += avail;
                } else {
                    taken += best_prefix(lo, avail, budget);
                }
            }
            taken
        };
        taken as i32
    }
}
