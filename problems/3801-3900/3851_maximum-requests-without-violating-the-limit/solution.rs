use std::collections::HashMap;

impl Solution {
    // The limit is per user, so users never interact: group each user's
    // times, sort them, and greedily keep every time whose k-back kept
    // predecessor sits more than window away. The kept count is at most
    // the request count <= 10^5 — everything fits in i32.
    pub fn max_requests(requests: Vec<Vec<i32>>, k: i32, window: i32) -> i32 {
        let mut by_user: HashMap<i32, Vec<i32>> = HashMap::new();
        for r in &requests {
            by_user.entry(r[0]).or_default().push(r[1]);
        }
        let k = k as usize;
        let mut total = 0i32;
        for times in by_user.values_mut() {
            times.sort();
            let mut kept: Vec<i32> = Vec::with_capacity(times.len());
            for &t in times.iter() {
                // Appending t is legal iff the k+1 last kept times span
                // strictly more than window: t - kept[len-k] > window.
                if kept.len() < k || t - kept[kept.len() - k] > window {
                    kept.push(t);
                }
            }
            total += kept.len() as i32;
        }
        total
    }
}
