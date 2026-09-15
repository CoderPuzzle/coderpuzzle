use std::collections::HashMap;

impl Solution {
    pub fn most_visited_pattern(username: Vec<String>, timestamp: Vec<i32>, website: Vec<String>) -> Vec<String> {
        let mut per_user: HashMap<&str, Vec<(i32, &str)>> = HashMap::new();
        for ((user, time), site) in username.iter().zip(timestamp.iter()).zip(website.iter()) {
            per_user.entry(user.as_str()).or_default().push((*time, site.as_str()));
        }
        let mut pattern_users: HashMap<[&str; 3], Vec<&str>> = HashMap::new();
        for (user, mut visits) in per_user {
            visits.sort_by_key(|v| v.0);
            let sites: Vec<&str> = visits.iter().map(|v| v.1).collect();
            for i in 0..sites.len() {
                for j in i + 1..sites.len() {
                    for k in j + 1..sites.len() {
                        let key = [sites[i], sites[j], sites[k]];
                        let entry = pattern_users.entry(key).or_default();
                        if !entry.contains(&user) {
                            entry.push(user);
                        }
                    }
                }
            }
        }
        let mut best: Vec<String> = Vec::new();
        let mut best_score = -1i32;
        for (pattern, users) in &pattern_users {
            let score = users.len() as i32;
            let candidate: Vec<String> = pattern.iter().map(|s| s.to_string()).collect();
            let better = score > best_score || (score == best_score && (best.is_empty() || candidate < best));
            if better {
                best_score = score;
                best = candidate;
            }
        }
        best
    }
}
