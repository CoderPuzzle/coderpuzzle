use std::collections::HashMap;

impl Solution {
    pub fn can_distribute(nums: Vec<i32>, quantity: Vec<i32>) -> bool {
        // A customer's integers must all be equal, so each customer draws
        // from a single value — and a value with count c serves any group
        // of customers whose quantities sum to at most c, with several
        // customers free to share one value. Only the counts matter, m is
        // at most 10, and there are at most 50 distinct values, so a
        // subset DP over customer bitmasks, one frequency value at a
        // time, covers every distribution.
        let mut counts = HashMap::new();
        for &value in &nums {
            *counts.entry(value).or_insert(0) += 1;
        }
        let m = quantity.len();
        let full = (1usize << m) - 1;
        // subset_sums[mask] = total amount ordered by the customers in mask.
        let mut subset_sums = vec![0i32; full + 1];
        for mask in 1..=full {
            let low = mask & mask.wrapping_neg();
            subset_sums[mask] = subset_sums[mask ^ low] + quantity[low.trailing_zeros() as usize];
        }
        // reachable[mask]: the customers in mask are served by the values
        // processed so far. Each value either stays unused (the previous
        // layer carries over) or takes one submask of the still-unsatisfied
        // customers whose quantity sum fits within its count.
        let mut reachable = vec![false; full + 1];
        reachable[0] = true;
        for &count in counts.values() {
            let mut next = reachable.clone();
            for mask in 0..=full {
                if !reachable[mask] {
                    continue;
                }
                let available = full ^ mask;
                let mut submask = available;
                while submask != 0 {
                    if subset_sums[submask] <= count {
                        next[mask | submask] = true;
                    }
                    submask = (submask - 1) & available;
                }
            }
            reachable = next;
        }
        reachable[full]
    }
}
