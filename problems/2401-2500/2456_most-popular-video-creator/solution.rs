use std::collections::HashMap;

impl Solution {
    pub fn most_popular_creator(creators: Vec<String>, ids: Vec<String>, views: Vec<i32>) -> Vec<Vec<String>> {
        // One pass keeps three running values per creator: total views,
        // best single-video view count, and the id achieving it
        // (lexicographically smallest on a tie). Totals reach
        // 10^5 * 10^5 = 10^10, so sums are i64.
        let mut totals: HashMap<String, i64> = HashMap::new();
        let mut best_view: HashMap<String, i32> = HashMap::new();
        let mut best_id: HashMap<String, String> = HashMap::new();
        for (i, creator) in creators.iter().enumerate() {
            *totals.entry(creator.clone()).or_insert(0) += i64::from(views[i]);
            let current = best_view.get(creator).copied();
            if current.is_none()
                || views[i] > current.unwrap()
                || (views[i] == current.unwrap() && ids[i] < best_id[creator])
            {
                best_view.insert(creator.clone(), views[i]);
                best_id.insert(creator.clone(), ids[i].clone());
            }
        }
        let top = totals.values().copied().max().unwrap_or(0);
        let mut answer: Vec<Vec<String>> = totals
            .iter()
            .filter(|(_, &total)| total == top)
            .map(|(creator, _)| vec![creator.clone(), best_id[creator].clone()])
            .collect();
        answer.sort();
        answer
    }
}
