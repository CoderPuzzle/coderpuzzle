impl Solution {
    pub fn string_matching(words: Vec<String>) -> Vec<String> {
        let mut result = Vec::new();
        let n = words.len();
        for i in 0..n {
            for j in 0..n {
                if j != i && words[j].contains(&words[i]) {
                    result.push(words[i].clone());
                    break;
                }
            }
        }
        result
    }
}
