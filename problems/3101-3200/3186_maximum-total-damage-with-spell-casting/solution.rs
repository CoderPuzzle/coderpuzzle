use std::collections::HashMap;

impl Solution {
    pub fn maximum_total_damage(power: Vec<i32>) -> i64 {
        // Copies of equal damage act as one all-or-nothing group worth
        // count * v (casting any copy already bans the rest of that
        // value). Sort unique damages ascending and run a forward
        // take/skip DP where taking v requires predecessors <= v - 3,
        // tracked by a monotone left pointer. Totals reach 10^14 at the
        // bounds, far beyond an i32, so run the gains in i64.
        let mut totals: HashMap<i32, i64> = HashMap::new();
        for &value in &power {
            *totals.entry(value).or_insert(0) += value as i64;
        }
        let mut groups: Vec<(i32, i64)> = totals.into_iter().collect();
        groups.sort_unstable();
        let m = groups.len();
        let mut best = vec![0i64; m];
        let mut left = 0usize;
        for j in 0..m {
            let v = groups[j].0 as i64;
            while (groups[left].0 as i64) <= v - 3 {
                left += 1;
            }
            let mut take = groups[j].1;
            if left > 0 {
                take += best[left - 1];
            }
            let skip = if j > 0 { best[j - 1] } else { 0 };
            best[j] = take.max(skip);
        }
        best[m - 1]
    }
}
