use std::collections::HashMap;

impl Solution {
    pub fn validate_coupons(code: Vec<String>, businessLine: Vec<String>, isActive: Vec<bool>) -> Vec<String> {
        // Category rank: electronics < grocery < pharmacy < restaurant.
        let rank: HashMap<&str, usize> = [("electronics", 0), ("grocery", 1), ("pharmacy", 2), ("restaurant", 3)]
            .iter()
            .cloned()
            .collect();

        let mut valid: Vec<(usize, String)> = Vec::new();
        for i in 0..code.len() {
            if !isActive[i] {
                continue;
            }
            let r = match rank.get(businessLine[i].as_str()) {
                Some(&r) => r,
                None => continue,
            };
            if !code_ok(&code[i]) {
                continue;
            }
            valid.push((r, code[i].clone()));
        }
        // Sort by (category rank, code); the code tiebreak is plain
        // lexicographic string order.
        valid.sort();
        valid.into_iter().map(|(_, name)| name).collect()
    }
}

fn code_ok(name: &str) -> bool {
    if name.is_empty() {
        return false;
    }
    name.chars().all(|c| c.is_ascii_alphanumeric() || c == '_')
}
