impl Solution {
    pub fn common_chars(words: Vec<String>) -> Vec<String> {
        // Fold every word's 26-length letter-count array into a running
        // element-wise minimum; a letter absent from any single word is
        // pinned to zero from that point on.
        let mut common = [0i32; 26];
        for (i, word) in words.iter().enumerate() {
            let mut counts = [0i32; 26];
            for c in word.bytes() {
                counts[(c - b'a') as usize] += 1;
            }
            if i == 0 {
                common = counts;
            } else {
                for j in 0..26 {
                    common[j] = common[j].min(counts[j]);
                }
            }
        }
        // Reading the surviving counts off from 'a' to 'z' builds the
        // answer directly in ascending alphabetical order.
        let mut result = Vec::new();
        for i in 0..26 {
            for _ in 0..common[i] {
                result.push(((b'a' + i as u8) as char).to_string());
            }
        }
        result
    }
}
