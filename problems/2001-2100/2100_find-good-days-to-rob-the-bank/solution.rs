impl Solution {
    pub fn good_days_to_rob_bank(security: Vec<i32>, time: i32) -> Vec<i32> {
        let n = security.len();
        let required = time as usize;
        let mut before = vec![0_usize; n];
        let mut after = vec![0_usize; n];
        for day in 1..n {
            if security[day - 1] >= security[day] {
                before[day] = before[day - 1] + 1;
            }
        }
        for day in (0..n.saturating_sub(1)).rev() {
            if security[day] <= security[day + 1] {
                after[day] = after[day + 1] + 1;
            }
        }
        (0..n)
            .filter(|&day| before[day] >= required && after[day] >= required)
            .map(|day| day as i32)
            .collect()
    }
}
