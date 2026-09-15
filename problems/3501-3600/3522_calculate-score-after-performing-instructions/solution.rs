impl Solution {
    // Each index executes at most once, so a linear walk with a visited
    // flag per index suffices: "add" contributes values[i] and steps to
    // i + 1, "jump" moves to i + values[i], and the process ends on any
    // out-of-bounds target or on an already-executed target (which is not
    // executed again). The score is 64-bit: with n up to 1e5 adds of
    // magnitude up to 1e5, |score| can reach 1e10.
    pub fn calculate_score(instructions: Vec<String>, values: Vec<i32>) -> i64 {
        let n = instructions.len();
        let mut executed = vec![false; n];
        let mut score: i64 = 0;
        let mut i: i64 = 0;
        while i >= 0 && (i as usize) < n && !executed[i as usize] {
            let u = i as usize;
            executed[u] = true;
            if instructions[u] == "add" {
                score += values[u] as i64;
                i += 1;
            } else {
                i += values[u] as i64;
            }
        }
        score
    }
}
