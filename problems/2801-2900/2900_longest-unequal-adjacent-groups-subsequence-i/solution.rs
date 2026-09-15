impl Solution {
    pub fn get_longest_subsequence(words: Vec<String>, groups: Vec<i32>) -> Vec<String> {
        // Taking the first element of every maximal run of equal group
        // values pins one deterministic answer out of the many the statement
        // permits.
        let mut result = vec![words[0].clone()];
        for i in 1..groups.len() {
            if groups[i] != groups[i - 1] {
                result.push(words[i].clone());
            }
        }
        result
    }
}
