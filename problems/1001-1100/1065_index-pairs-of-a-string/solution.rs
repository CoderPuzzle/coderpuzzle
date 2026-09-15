impl Solution {
    pub fn index_pairs(text: String, words: Vec<String>) -> Vec<Vec<i32>> {
        let bytes = text.as_bytes();
        let n = bytes.len();
        let mut result: Vec<Vec<i32>> = Vec::new();
        for i in 0..n {
            for word in &words {
                let wb = word.as_bytes();
                let end = i + wb.len();
                if end <= n && &bytes[i..end] == wb {
                    result.push(vec![i as i32, (end - 1) as i32]);
                }
            }
        }
        result.sort();
        result
    }
}
