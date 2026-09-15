impl Solution {
    // One stack of unmarked indices per letter: the closest unmarked
    // mirror candidate is always the most recently pushed one.
    pub fn calculate_score(s: String) -> i64 {
        let mut stacks: Vec<Vec<i32>> = vec![Vec::new(); 26];
        let mut score: i64 = 0;
        for (i, b) in s.bytes().enumerate() {
            let c = (b - b'a') as usize;
            // Match with the nearest unmarked mirror and mark both.
            if let Some(j) = stacks[25 - c].pop() {
                score += i as i64 - j as i64;
            } else {
                stacks[c].push(i as i32);
            }
        }
        score
    }
}
