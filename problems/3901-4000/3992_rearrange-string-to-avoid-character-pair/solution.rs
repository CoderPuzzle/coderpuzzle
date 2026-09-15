impl Solution {
    pub fn rearrange_string(s: String, x: String, y: String) -> String {
        let mut letters: Vec<char> = s.chars().collect();
        letters.sort_unstable(); // groups equal letters into one block each
        if x.as_str() < y.as_str() {
            letters.reverse(); // puts the y block before the x block
        }
        letters.into_iter().collect()
    }
}
