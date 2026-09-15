impl Solution {
    pub fn number_of_weeks(milestones: Vec<i32>) -> i64 {
        // Only the largest project can block the schedule: every milestone
        // of the other projects acts as a separator letting one extra
        // milestone of the largest project be placed without adjacency. If
        // rest (all other milestones) is at least mx - 1, every milestone
        // is schedulable (total weeks); otherwise the best is rest
        // separator-and-large pairs plus one final large milestone, i.e.
        // 2 * rest + 1 weeks.
        let total: i64 = milestones.iter().map(|&m| m as i64).sum();
        let mx = *milestones.iter().max().unwrap() as i64;
        let rest = total - mx;
        (2 * rest + 1).min(total)
    }
}
