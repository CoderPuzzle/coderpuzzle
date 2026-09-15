// Type characters into one growing buffer: letters append, and each
// 'i' reverses everything typed so far. After the last keystroke the
// buffer is exactly the laptop screen.
impl Solution {
    pub fn final_string(s: String) -> String {
        let mut screen: Vec<u8> = Vec::new();
        for c in s.bytes() {
            if c == b'i' {
                screen.reverse();
            } else {
                screen.push(c);
            }
        }
        String::from_utf8(screen).unwrap()
    }
}
