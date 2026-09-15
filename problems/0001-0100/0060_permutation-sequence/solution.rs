impl Solution {
    pub fn get_permutation(n: i32, k: i32) -> String {
        let n = n as usize;
        // Digits stay sorted, so the index computed below is the position of
        // the chosen digit among the digits still available.
        let mut digits: Vec<char> = (1..=n).map(|value| char::from(b'0' + value as u8)).collect();
        // factorials[block] = block! — the size of one block at a position
        // with `block` positions still unfilled after it. 9! fits in 32 bits,
        // but the ranks ride in i64 so nothing narrows on the way.
        let mut factorials = vec![1i64; n + 1];
        for value in 1..=n {
            factorials[value] = factorials[value - 1] * value as i64;
        }
        let mut rank = k as i64 - 1;
        let mut result = String::new();
        for block in (0..n).rev() {
            // Quotient picks the digit, remainder is the rank inside its block.
            let index = (rank / factorials[block]) as usize;
            rank %= factorials[block];
            result.push(digits.remove(index));
        }
        result
    }
}
