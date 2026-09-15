impl Solution {
    pub fn num_of_strings(patterns: Vec<String>, word: String) -> i32 {
        // Each pattern is judged on its own: count the ones that occur as
        // a contiguous substring of word.
        patterns.iter().filter(|p| word.contains(p.as_str())).count() as i32
    }
}
