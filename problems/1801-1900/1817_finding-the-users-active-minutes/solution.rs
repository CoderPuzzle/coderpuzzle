use std::collections::HashMap;

// A user's UAM is the size of the set of minutes they acted in, so one pass
// grouping logs into per-user minute sets is all the counting needed; each
// user then lands in exactly one answer bucket.
impl Solution {
    pub fn finding_users_active_minutes(logs: Vec<Vec<i32>>, k: i32) -> Vec<i32> {
        let mut minutes_by_user: HashMap<i32, std::collections::HashSet<i32>> = HashMap::new();
        for log in &logs {
            minutes_by_user.entry(log[0]).or_default().insert(log[1]);
        }
        let mut answer = vec![0; k as usize];
        for minutes in minutes_by_user.values() {
            // k covers every user's UAM by the constraints; the guard only
            // keeps a malformed k from writing out of range.
            if (minutes.len() as i32) <= k {
                answer[minutes.len() - 1] += 1;
            }
        }
        answer
    }
}
