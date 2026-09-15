use std::collections::HashSet;

impl Solution {
    pub fn num_unique_emails(emails: Vec<String>) -> i32 {
        let mut distinct: HashSet<String> = HashSet::new();
        for email in &emails {
            let mut normalized = String::with_capacity(email.len());
            let mut ignored = false;
            for (i, ch) in email.chars().enumerate() {
                if ch == '@' {
                    // The domain is untouched: take it verbatim from '@' on.
                    normalized.push_str(&email[i..]);
                    break;
                }
                if ignored {
                    continue; // everything after the first '+' is dropped
                }
                if ch == '.' {
                    continue; // dots in the local name vanish
                }
                if ch == '+' {
                    ignored = true;
                    continue;
                }
                normalized.push(ch);
            }
            distinct.insert(normalized);
        }
        distinct.len() as i32
    }
}
