use std::collections::HashSet;

impl Solution {
    pub fn dest_city(paths: Vec<Vec<String>>) -> String {
        let sources: HashSet<&str> = paths.iter().map(|p| p[0].as_str()).collect();
        for path in &paths {
            if !sources.contains(path[1].as_str()) {
                return path[1].clone();
            }
        }
        String::new()
    }
}
