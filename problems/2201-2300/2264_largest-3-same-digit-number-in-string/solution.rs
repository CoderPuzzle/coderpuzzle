impl Solution {
    pub fn largest_good_integer(num: String) -> String {
        let bytes = num.as_bytes();
        let mut best: Vec<u8> = Vec::new();
        for i in 2..bytes.len() {
            if bytes[i] == bytes[i - 1] && bytes[i] == bytes[i - 2] {
                if best.is_empty() || bytes[i] > best[0] {
                    best = vec![bytes[i]; 3];
                }
            }
        }
        String::from_utf8(best).unwrap()
    }
}
