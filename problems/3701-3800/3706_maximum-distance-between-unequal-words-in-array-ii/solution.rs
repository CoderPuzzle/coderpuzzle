impl Solution {
    pub fn max_distance(words: Vec<String>) -> i32 {
        // When the outermost words already differ, that pair spans the whole
        // array and nothing can beat it.
        let n = words.len() as i32;
        if words[0] != words[(n - 1) as usize] {
            return n;
        }
        // The ends share one word, so any word differing from it pairs with
        // whichever end it does not sit at: the first such index widens the
        // pair with the last slot, the last such index widens the pair with
        // slot 0, and each scan can stop at its first hit.
        let mut best = 0i32;
        for i in 0..words.len() {
            if words[i] != words[0] {
                best = n - i as i32;
                break;
            }
        }
        for j in (0..words.len()).rev() {
            if words[j] != words[(n - 1) as usize] {
                best = best.max(j as i32 + 1);
                break;
            }
        }
        // No differing word at all means every word is equal.
        best
    }
}
