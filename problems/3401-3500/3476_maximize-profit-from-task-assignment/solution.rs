use std::collections::HashMap;

impl Solution {
    // Skills partition the problem: inside one skill class every worker
    // is interchangeable and can take any task of that class, so the k
    // workers of a skill simply claim its k most profitable tasks. The
    // extra worker then claims the best leftover overall.
    pub fn max_profit(workers: Vec<i32>, tasks: Vec<Vec<i32>>) -> i64 {
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for &w in &workers {
            *counts.entry(w).or_insert(0) += 1;
        }
        let mut groups: HashMap<i32, Vec<i32>> = HashMap::new();
        for t in &tasks {
            groups.entry(t[0]).or_default().push(t[1]);
        }
        let mut total: i64 = 0;
        let mut best_extra: i64 = 0;
        for (skill, profits) in &mut groups {
            profits.sort_unstable_by(|a, b| b.cmp(a));
            let take = (*counts.get(skill).unwrap_or(&0) as usize).min(profits.len());
            for &p in profits.iter().take(take) {
                total += p as i64;
            }
            if take < profits.len() && profits[take] as i64 > best_extra {
                best_extra = profits[take] as i64;
            }
        }
        total + best_extra
    }
}
