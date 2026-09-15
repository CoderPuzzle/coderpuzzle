impl Solution {
    pub fn two_edit_words(queries: Vec<String>, dictionary: Vec<String>) -> Vec<String> {
        // A query survives iff some dictionary word differs in at most two
        // positions; the strings are equal-length, so a position count is all
        // it takes.
        let mut result: Vec<String> = Vec::new();
        for q in &queries {
            for d in &dictionary {
                if edits(q, d) <= 2 {
                    result.push(q.clone());
                    break;
                }
            }
        }
        result
    }
}

fn edits(a: &str, b: &str) -> usize {
    a.bytes().zip(b.bytes()).filter(|(x, y)| x != y).count()
}
