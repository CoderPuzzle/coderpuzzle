use std::collections::HashMap;

impl Solution {
    pub fn find_substring(s: String, words: Vec<String>) -> Vec<i32> {
        let word_length = words[0].len();
        let word_count = words.len();
        // Required multiset of words; a window matches when its counts equal it.
        let mut target: HashMap<&str, i32> = HashMap::new();
        for word in &words {
            *target.entry(word.as_str()).or_insert(0) += 1;
        }
        let mut result: Vec<i32> = Vec::new();
        // One sliding window per alignment offset: a match can only start at a
        // position congruent to some r in 0..word_length-1 modulo word_length.
        for offset in 0..word_length {
            let mut window: HashMap<&str, i32> = HashMap::new();
            let mut count = 0; // Words currently inside the window.
            let mut left = offset;
            let mut right = offset;
            while right + word_length <= s.len() {
                let word = &s[right..right + word_length];
                if !target.contains_key(word) {
                    // A non-word block can never appear in a match, so the
                    // window empties and resumes after it.
                    window.clear();
                    count = 0;
                    left = right + word_length;
                } else {
                    *window.entry(word).or_insert(0) += 1;
                    count += 1;
                    // Too many copies of word: release blocks from the left
                    // end until the surplus is gone.
                    while window[word] > target[word] {
                        *window.entry(&s[left..left + word_length]).or_insert(0) -= 1;
                        count -= 1;
                        left += word_length;
                    }
                    if count == word_count {
                        result.push(left as i32);
                        // Release the leftmost block so the window can keep
                        // sliding toward the next (possibly adjacent) match.
                        *window.entry(&s[left..left + word_length]).or_insert(0) -= 1;
                        count -= 1;
                        left += word_length;
                    }
                }
                right += word_length;
            }
        }
        // Each offset emits ascending indices within its residue class; one
        // sort merges the classes into the pinned ascending order.
        result.sort_unstable();
        result
    }
}
