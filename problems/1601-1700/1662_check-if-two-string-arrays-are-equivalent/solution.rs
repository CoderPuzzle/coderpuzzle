impl Solution {
    pub fn array_strings_are_equal(word1: Vec<String>, word2: Vec<String>) -> bool {
        // Walk both arrays with an array index plus an offset inside the
        // current element: the two concatenated streams are compared one
        // character at a time, never materialized.
        let mut array1 = 0;
        let mut offset1 = 0;
        let mut array2 = 0;
        let mut offset2 = 0;
        while array1 < word1.len() && array2 < word2.len() {
            if word1[array1].as_bytes()[offset1] != word2[array2].as_bytes()[offset2] {
                return false;
            }
            offset1 += 1;
            if offset1 == word1[array1].len() {
                array1 += 1;
                offset1 = 0;
            }
            offset2 += 1;
            if offset2 == word2[array2].len() {
                array2 += 1;
                offset2 = 0;
            }
        }
        // Equal only if both walks exhausted together: an unfinished array
        // means its concatenation is strictly longer.
        array1 == word1.len() && array2 == word2.len()
    }
}
