impl Solution {
    // Capped knapsack over positions 1..n-1: not_peak[j]/peak[j] are the
    // cheapest ways to reach j peaks (j == cap means "at least cap") with the
    // current position left unpicked / picked.
    fn linear(n: usize, c: &Vec<i64>, cap: usize, force_start: bool, force_end: bool) -> i64 {
        const INF: i64 = 4_000_000_000_000_000_000;
        let mut not_peak = vec![INF; cap + 1];
        let mut peak = vec![INF; cap + 1];
        not_peak[0] = 0;
        if !force_start && cap >= 1 {
            peak[1] = c[1];
        }
        for i in 2..n {
            let mut new_not = vec![INF; cap + 1];
            let mut new_peak = vec![INF; cap + 1];
            for j in 0..=cap {
                new_not[j] = not_peak[j].min(peak[j]);
            }
            // A peak needs the previous position unpicked; over cap, extra peaks
            // stay folded into the top cell.
            if !(i == n - 1 && force_end) {
                let base = c[i];
                for j in 1..cap {
                    let v = not_peak[j - 1];
                    if v < INF {
                        new_peak[j] = v + base;
                    }
                }
                if cap >= 1 {
                    let v = not_peak[cap - 1].min(not_peak[cap]);
                    if v < INF {
                        new_peak[cap] = v + base;
                    }
                }
            }
            not_peak = new_not;
            peak = new_peak;
        }
        not_peak[cap].min(peak[cap])
    }

    // A peak's two neighbours (circular) can never themselves be peaks, so they
    // keep their original values and making position i a peak costs
    // max(0, max(prev, nxt) + 1 - nums[i]) with original neighbour values.
    pub fn min_operations(nums: Vec<i32>, k: i32) -> i64 {
        let n = nums.len();
        let k = k as usize;
        if k == 0 {
            return 0;
        }
        if k > n / 2 {
            return -1; // a circle admits at most floor(n/2) peaks
        }
        let mut c = vec![0i64; n];
        for i in 1..n {
            let prev = if i >= 2 { nums[i - 1] } else { nums[0] };
            let nxt = if i <= n - 2 { nums[i + 1] } else { nums[0] };
            c[i] = (prev.max(nxt) as i64 + 1 - nums[i] as i64).max(0);
        }
        // Case A: index 0 is a peak, so positions 1 and n-1 cannot be peaks.
        let cost0 = (nums[n - 1].max(nums[1]) as i64 + 1 - nums[0] as i64).max(0);
        let ans_a = cost0 + Self::linear(n, &c, (k - 1).max(0), true, true);
        // Case B: index 0 stays unpicked; all other positions are free.
        let ans_b = Self::linear(n, &c, k, false, false);
        let ans = ans_a.min(ans_b);
        if ans >= 4_000_000_000_000_000_000 {
            -1
        } else {
            ans
        }
    }
}
