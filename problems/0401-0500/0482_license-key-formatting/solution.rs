impl Solution {
    // Dashes are separators, not content: build the cleaned key by dropping
    // them and uppercasing everything that remains.
    pub fn license_key_formatting(s: String, k: i32) -> String {
        let k = k as usize;
        let key: Vec<char> = s
            .chars()
            .filter(|ch| *ch != '-')
            .map(|ch| ch.to_ascii_uppercase())
            .collect();
        if key.is_empty() {
            return String::new();
        }
        // Only the first group may be short, and only when the key length
        // leaves a remainder — otherwise it holds the full k characters.
        let remainder = key.len() % k;
        let head = if remainder == 0 { k } else { remainder };
        let mut groups: Vec<String> = vec![key[..head].iter().collect()];
        let mut i = head;
        while i < key.len() {
            groups.push(key[i..i + k].iter().collect());
            i += k;
        }
        groups.join("-")
    }
}
