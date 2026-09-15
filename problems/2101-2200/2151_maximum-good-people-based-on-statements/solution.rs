impl Solution {
    pub fn maximum_good(statements: Vec<Vec<i32>>) -> i32 {
        let n = statements.len();
        let mut best = 0;
        // Enumerate every assignment: bit i set means person i is good.
        // The constraint is one-sided — good people must tell the truth,
        // bad people may say anything.
        for mask in 0..(1usize << n) {
            let mut valid = true;
            let mut count = 0;
            'outer: for i in 0..n {
                if mask & (1 << i) == 0 {
                    continue;
                }
                count += 1;
                for j in 0..n {
                    // 2 = no statement; a "j is good" claim requires bit j
                    // set and a "j is bad" claim requires it clear.
                    if statements[i][j] == 2 {
                        continue;
                    }
                    let is_good = mask & (1 << j) != 0;
                    if is_good != (statements[i][j] == 1) {
                        valid = false;
                        break 'outer;
                    }
                }
            }
            if valid {
                best = best.max(count);
            }
        }
        best as i32
    }
}
