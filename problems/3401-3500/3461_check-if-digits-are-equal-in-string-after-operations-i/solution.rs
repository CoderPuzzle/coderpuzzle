impl Solution {
    // Each operation is a local rule: replace every adjacent pair with its
    // sum mod 10, shrinking the digit list by one. With at most 100 digits
    // the whole reduction is at most ~5000 additions, so simulate it
    // directly and compare the two survivors.
    pub fn has_same_digits(s: String) -> bool {
        let mut d: Vec<u8> = s.bytes().map(|b| b - b'0').collect();
        while d.len() > 2 {
            let n = d.len();
            for i in 0..n - 1 {
                d[i] = (d[i] + d[i + 1]) % 10;
            }
            d.pop();
        }
        d[0] == d[1]
    }
}
