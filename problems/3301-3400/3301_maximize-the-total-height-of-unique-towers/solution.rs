impl Solution {
    pub fn maximum_total_sum(maximumHeight: Vec<i32>) -> i64 {
        // Sorting descending makes the distinctness bound exact position by
        // position: once the previous tower took height prev, no later tower
        // may take anything above prev - 1, so each assigned height is
        // min(cap, prev - 1); falling below 1 means some prefix demands more
        // distinct positive integers than exist up to the largest cap, and
        // no rearrangement helps. Totals reach 10^14, so everything widens
        // to i64.
        let mut maximumHeight = maximumHeight;
        maximumHeight.sort_unstable_by(|a, b| b.cmp(a));
        let mut total: i64 = 0;
        let mut prev: i64 = i64::MAX;
        for &cap in &maximumHeight {
            let height = (cap as i64).min(prev - 1);
            if height < 1 {
                return -1;
            }
            total += height;
            prev = height;
        }
        total
    }
}
