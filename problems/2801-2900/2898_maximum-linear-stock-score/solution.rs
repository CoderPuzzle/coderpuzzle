use std::collections::HashMap;

impl Solution {
    pub fn max_score(prices: Vec<i32>) -> i64 {
        // prices[indexes[j]] - prices[indexes[j - 1]] == indexes[j] -
        // indexes[j - 1] rearranges to prices[i] - i equal on consecutive
        // picks, so every linear selection lives inside one offset group and
        // any subset of one group is linear.  Every price is >= 1, so the
        // best subset of a group is the whole group; the answer is the
        // largest group total.  It is bounded by 10^5 * 10^9 = 10^14, which
        // is why it rides in an i64.
        let mut group_sum: HashMap<i32, i64> = HashMap::new();
        let mut best: i64 = 0;
        for (day, &price) in prices.iter().enumerate() {
            let slot = group_sum.entry(price - day as i32 - 1).or_insert(0);
            *slot += price as i64;
            if *slot > best {
                best = *slot;
            }
        }
        best
    }
}
