impl Solution {
    // One pass remembering the most recent position of each word. The
    // statement guarantees word1 != word2, so no element is ever both.
    pub fn shortest_distance(wordsDict: Vec<String>, word1: String, word2: String) -> i32 {
        let mut index1: i32 = -1;
        let mut index2: i32 = -1;
        // The two words sit at distinct indices, so no real gap reaches the
        // length of the list — it is a safe unreachable starting bound.
        let mut best = wordsDict.len() as i32;
        for (index, word) in wordsDict.iter().enumerate() {
            if word.as_str() == word1.as_str() {
                index1 = index as i32;
            } else if word.as_str() == word2.as_str() {
                index2 = index as i32;
            }
            if index1 >= 0 && index2 >= 0 {
                // A fresh occurrence is closest to the latest opposite
                // occurrence behind it; older ones lie farther back, so this
                // single gap is the only candidate the new occurrence adds.
                best = best.min((index1 - index2).abs());
            }
        }
        best
    }
}
