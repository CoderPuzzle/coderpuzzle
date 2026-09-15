impl Solution {
    pub fn arrange_words(text: String) -> String {
        let mut words: Vec<String> = text.split(' ').map(|w| w.to_string()).collect();
        let first = words[0].to_lowercase();
        words[0] = first;
        words.sort_by_key(|w| w.len());
        let mut head = words[0].clone();
        let mut chars = head.chars();
        match chars.next() {
            Some(c) => {
                head = c.to_uppercase().collect::<String>() + chars.as_str();
                words[0] = head;
            }
            None => {}
        }
        words.join(" ")
    }
}
