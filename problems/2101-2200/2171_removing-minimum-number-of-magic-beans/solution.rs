impl Solution {
    pub fn minimum_removal(mut beans: Vec<i32>) -> i64 {
        // In a sorted layout, keeping bags equal to the value at index i
        // means: remove everything before i entirely, and trim every later
        // bag down to that value. Totals reach 10^10, so i64 carries them.
        beans.sort_unstable();
        let total: i64 = beans.iter().map(|&bean| i64::from(bean)).sum();
        let n = beans.len() as i64;
        let mut best = total; // keep nothing (degenerate floor)
        for (index, &value) in beans.iter().enumerate() {
            let kept_total = i64::from(value) * (n - index as i64);
            best = best.min(total - kept_total);
        }
        best
    }
}
