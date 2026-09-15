impl Solution {
    pub fn min_merge_cost(lists: Vec<Vec<i32>>) -> i64 {
        let n = lists.len();
        let size = 1usize << n;

        // Total length of every mask, built up from its lowest set bit.
        let mut total_len = vec![0i64; size];
        for mask in 1..size {
            let low = mask & mask.wrapping_neg();
            let idx = low.trailing_zeros() as usize;
            total_len[mask] = total_len[mask ^ low] + lists[idx].len() as i64;
        }

        // Left-middle median of every mask, found without materializing the
        // merged list: binary search the sorted value pool for the smallest
        // value with more than half the mask's elements at or below it.
        let mut vals: Vec<i32> = lists.concat();
        vals.sort_unstable();
        let mut med = vec![0i64; size];
        for mask in 1..size {
            let rank = ((total_len[mask] - 1) / 2) as usize;
            let (mut lo, mut hi) = (0usize, vals.len() - 1);
            while lo < hi {
                let mid = (lo + hi) / 2;
                let mut cnt = 0usize;
                for i in 0..n {
                    if mask >> i & 1 == 1 {
                        cnt += lists[i].partition_point(|&v| v <= vals[mid]);
                    }
                }
                if cnt > rank {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            med[mask] = vals[lo] as i64;
        }

        // dp over subsets: the last merge of a mask always pays the mask's
        // total length plus the gap between the two merged-in medians, so
        // only the split itself is a free choice.
        let inf = i64::MAX / 4;
        let mut dp = vec![inf; size];
        for mask in 1..size {
            if mask & (mask - 1) == 0 {
                dp[mask] = 0;
                continue;
            }
            let mut best = inf;
            let mut sub = (mask - 1) & mask;
            while sub != 0 {
                let other = mask ^ sub;
                if sub < other {
                    // each unordered split exactly once
                    let cost = dp[sub] + dp[other] + total_len[mask] + (med[sub] - med[other]).abs();
                    if cost < best {
                        best = cost;
                    }
                }
                sub = (sub - 1) & mask;
            }
            dp[mask] = best;
        }
        dp[size - 1]
    }
}
