impl Solution {
    pub fn remove_anagrams(words: Vec<String>) -> Vec<String> {
        let mut result: Vec<String> = Vec::new();
        let mut prev: Vec<u8> = Vec::new();
        for word in words {
            let mut letters = word.clone().into_bytes();
            letters.sort();
            if letters != prev {
                prev = letters;
                result.push(word);
            }
        }
        result
    }
}
