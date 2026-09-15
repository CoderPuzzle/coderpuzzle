impl Solution {
    pub fn generate_tag(caption: String) -> String {
        // Words are joined in order — the first word fully lowercase,
        // later words with only their first letter capitalized — then the
        // leading '#' plus English letters survive and the tag is cut to
        // 100 characters.
        let mut tag = String::from("#");
        for (index, word) in caption.split_whitespace().enumerate() {
            let lower = word.to_lowercase();
            if index == 0 {
                tag.push_str(&lower);
            } else {
                let mut chars = lower.chars();
                if let Some(first) = chars.next() {
                    tag.push(first.to_ascii_uppercase());
                    tag.push_str(chars.as_str());
                }
            }
        }
        let mut kept = String::from("#");
        for ch in tag.chars().skip(1) {
            if ch.is_ascii_alphabetic() {
                kept.push(ch);
            }
        }
        kept.chars().take(100).collect()
    }
}
