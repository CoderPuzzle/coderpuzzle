impl Solution {
    pub fn longest_diverse_string(a: i32, b: i32, c: i32) -> String {
        let mut counts = [a, b, c];
        let letters = [b'a', b'b', b'c'];
        let mut result: Vec<u8> = Vec::new();
        // most plentiful letter first: burning rare letters while a common
        // one dominates would strand it in a forced aaa/bbb/ccc run
        loop {
            let mut idx = [0usize, 1, 2];
            idx.sort_by(|&x, &y| counts[y].cmp(&counts[x]).then_with(|| letters[x].cmp(&letters[y])));
            let mut pick = idx[0];
            if counts[pick] == 0 {
                break;
            }
            let n = result.len();
            if n >= 2 && result[n - 1] == letters[pick] && result[n - 2] == letters[pick] {
                // head letter just placed twice -> switch to the runner-up; if
                // the runner-up is out of budget, only one letter remains and it
                // is already doubled — cap here rather than emit a triple
                pick = idx[1];
                if counts[pick] == 0 {
                    break;
                }
            }
            result.push(letters[pick]);
            counts[pick] -= 1;
        }
        String::from_utf8(result).unwrap()
    }
}
