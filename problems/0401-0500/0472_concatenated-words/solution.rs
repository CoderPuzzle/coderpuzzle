impl Solution {
    pub fn find_all_concatenated_words_in_a_dict(words: Vec<String>) -> Vec<String> {
        let dictionary: std::collections::HashSet<&str> = words.iter().map(|word| word.as_str()).collect();

        fn is_concatenated(word: &str, dictionary: &std::collections::HashSet<&str>) -> bool {
            let n = word.len();
            // Word-break DP: dp[i] = the first i chars split entirely into
            // dictionary words (dp[0] = empty prefix).
            let mut dp = vec![false; n + 1];
            dp[0] = true;
            for i in 1..=n {
                for j in 0..i {
                    // Excluding the whole-word split forces >= 2 pieces;
                    // only proper substrings are looked up, so the
                    // unfiltered set of all words is safe.
                    if j == 0 && i == n {
                        continue; // the word itself does not count as a part
                    }
                    if dp[j] && dictionary.contains(&word[j..i]) {
                        // One valid split per position suffices.
                        dp[i] = true;
                        break;
                    }
                }
            }
            dp[n]
        }

        let mut result: Vec<String> = Vec::new();
        for word in &words {
            if is_concatenated(word, &dictionary) {
                result.push(word.clone());
            }
        }
        result
    }
}
