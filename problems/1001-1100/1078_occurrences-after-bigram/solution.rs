impl Solution {
    pub fn find_ocurrences(text: String, first: String, second: String) -> Vec<String> {
        let words: Vec<&str> = text.split(' ').collect();
        let mut thirds = Vec::new();
        // Bounding at words.len() - 2 guarantees words[i + 2] always
        // exists, so a bigram landing on the last two words is never
        // inspected.
        if words.len() >= 2 {
            for i in 0..words.len() - 2 {
                if words[i] == first && words[i + 1] == second {
                    thirds.push(words[i + 2].to_string());
                }
            }
        }
        thirds
    }
}
