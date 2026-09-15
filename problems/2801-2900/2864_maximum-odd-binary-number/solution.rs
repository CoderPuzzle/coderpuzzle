// Parity fixes the last bit: one '1' must sit in the final position, so
// push every remaining '1' to the front and let all '0's slot in between
// them and that trailing one.
impl Solution {
    pub fn maximum_odd_binary_number(s: String) -> String {
        let ones = s.bytes().filter(|c| *c == b'1').count();
        let mut result: Vec<u8> = vec![b'0'; s.len()];
        for k in 0..(ones - 1) {
            result[k] = b'1';
        }
        result[s.len() - 1] = b'1';
        String::from_utf8(result).unwrap()
    }
}
