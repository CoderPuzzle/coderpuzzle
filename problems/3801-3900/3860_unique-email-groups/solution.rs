use std::collections::HashSet;

impl Solution {
    pub fn unique_email_groups(emails: Vec<String>) -> i32 {
        // A group is identified by its normalized address: the local part
        // loses its dots and anything from the first '+', then both parts
        // are lowercased.
        let mut seen = HashSet::new();
        for email in &emails {
            let at = email.find('@').unwrap();
            let local = &email[..at];
            let local = match local.find('+') {
                Some(plus) => &local[..plus],
                None => local,
            };
            let domain = email[at + 1..].to_lowercase();
            let key = local.chars().filter(|&c| c != '.').collect::<String>().to_lowercase() + "@" + &domain;
            seen.insert(key);
        }
        seen.len() as i32
    }
}
