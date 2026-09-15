impl Solution {
    pub fn total_distance(s: String) -> i32 {
        // The keyboard is three ragged rows — qwertyuiop, asdfghjkl,
        // zxcvbnm — so recording each letter's (row, col) cell once turns
        // the answer into a running Manhattan sum: the finger starts on
        // 'a', and each typed letter adds |r1 - r2| + |c1 - c2| for the
        // move from the previous key.
        let rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
        let mut row = [0i32; 26];
        let mut col = [0i32; 26];
        for (r, keys) in rows.iter().enumerate() {
            for (c, ch) in keys.bytes().enumerate() {
                row[(ch - b'a') as usize] = r as i32;
                col[(ch - b'a') as usize] = c as i32;
            }
        }
        let mut total = 0i32;
        let (mut pr, mut pc) = (row[0], col[0]);
        for ch in s.bytes() {
            let i = (ch - b'a') as usize;
            total += (pr - row[i]).abs() + (pc - col[i]).abs();
            pr = row[i];
            pc = col[i];
        }
        total
    }
}
