impl Solution {
    pub fn minimum_relative_losses(mut prices: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i64> {
        prices.sort_unstable();
        let n = prices.len();
        let mut prefix = vec![0_i64; n + 1];
        for (i, price) in prices.iter().enumerate() {
            prefix[i + 1] = prefix[i] + *price as i64;
        }
        let mut answer = Vec::with_capacity(queries.len());
        for query in queries {
            let k = query[0] as i64;
            let m = query[1] as usize;
            // Every intermediate stays near 2 * 10^5 * 10^9, inside an i64.
            let mut split = 0_usize;
            let mut bound = n;
            while split < bound {
                let mid = (split + bound) / 2;
                if (prices[mid] as i64) <= k {
                    split = mid + 1;
                } else {
                    bound = mid;
                }
            }
            let mut lo = m.saturating_sub(n - split);
            let mut hi = m.min(split);
            while lo < hi {
                let mid = (lo + hi) / 2;
                if prices[mid] as i64 + prices[n - m + mid] as i64 >= 2 * k {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            let rest = m - lo;
            answer.push(prefix[lo] + 2 * k * rest as i64 - (prefix[n] - prefix[n - rest]));
        }
        answer
    }
}
