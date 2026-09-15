use std::collections::HashMap;

impl Solution {
    pub fn high_five(items: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // Bucket every score by student, sort each bucket descending, and
        // average the top five with integer division.
        let mut scores: HashMap<i32, Vec<i32>> = HashMap::new();
        for item in items {
            scores.entry(item[0]).or_default().push(item[1]);
        }
        let mut ids: Vec<i32> = scores.keys().cloned().collect();
        ids.sort_unstable();
        let mut result = Vec::with_capacity(ids.len());
        for sid in ids {
            let mut list = scores.remove(&sid).unwrap();
            list.sort_unstable_by(|a, b| b.cmp(a));
            let total: i32 = list.iter().take(5).sum();
            result.push(vec![sid, total / 5]);
        }
        result
    }
}
