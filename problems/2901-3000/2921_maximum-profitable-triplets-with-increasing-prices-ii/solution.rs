impl Solution {
    pub fn max_profit(prices: Vec<i32>, profits: Vec<i32>) -> i32 {
        // Fix the middle item j. Two Fenwick (binary indexed) trees over the
        // compressed price ranks answer, for every j, the maximum profit
        // among earlier items priced strictly below prices[j] and among
        // later items priced strictly above prices[j]; the right pass runs
        // the same prefix queries over reversed ranks. Every profit is >= 1,
        // so a query result of 0 means "no such item exists". With n up to
        // 5 * 10^4 these two log-passes are what keep the scan linear-ish.
        let n = prices.len();
        let mut ranks = prices.clone();
        ranks.sort_unstable();
        ranks.dedup();
        let m = ranks.len();
        let rank_of = |p: i32| -> usize {
            let mut lo = 0usize;
            let mut hi = m;
            while lo < hi {
                let mid = (lo + hi) / 2;
                if ranks[mid] < p {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            lo + 1
        };
        let query = |tree: &Vec<i32>, mut i: usize| -> i32 {
            let mut best = 0;
            while i > 0 {
                if tree[i] > best {
                    best = tree[i];
                }
                i -= i & i.wrapping_neg();
            }
            best
        };
        let update = |tree: &mut Vec<i32>, mut i: usize, gain: i32| {
            while i <= m {
                if gain > tree[i] {
                    tree[i] = gain;
                }
                i += i & i.wrapping_neg();
            }
        };
        let mut tree = vec![0i32; m + 1];
        let mut left = vec![0i32; n];
        for j in 0..n {
            let r = rank_of(prices[j]);
            left[j] = query(&tree, r - 1);
            update(&mut tree, r, profits[j]);
        }
        tree.iter_mut().for_each(|v| *v = 0);
        let mut right = vec![0i32; n];
        for j in (0..n).rev() {
            let r = m + 1 - rank_of(prices[j]);
            right[j] = query(&tree, r - 1);
            update(&mut tree, r, profits[j]);
        }
        let mut best = -1;
        for j in 0..n {
            if left[j] > 0 && right[j] > 0 {
                best = best.max(left[j] + profits[j] + right[j]);
            }
        }
        best
    }
}
