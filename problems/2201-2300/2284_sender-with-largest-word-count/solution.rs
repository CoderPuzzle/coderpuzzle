use std::collections::HashMap;

impl Solution {
    pub fn largest_word_count(messages: Vec<String>, senders: Vec<String>) -> String {
        let mut counts: HashMap<String, i32> = HashMap::new();
        for (message, sender) in messages.into_iter().zip(senders) {
            *counts.entry(sender).or_insert(0) += message.matches(' ').count() as i32 + 1;
        }
        let mut best_sender = String::new();
        let mut best_count = -1;
        for (sender, count) in counts {
            if count > best_count || (count == best_count && sender > best_sender) {
                best_count = count;
                best_sender = sender;
            }
        }
        best_sender
    }
}
