impl Solution {
    pub fn decode_message(key: String, message: String) -> String {
        // First appearances in key fill the substitution table in order,
        // each new letter taking the next alphabet letter; spaces map to
        // spaces, then message is translated through the table.
        let mut table = [0u8; 26];
        let mut next = b'a';
        for &ch in key.as_bytes() {
            if ch != b' ' && table[(ch - b'a') as usize] == 0 {
                table[(ch - b'a') as usize] = next;
                next += 1;
            }
        }
        let mut out = String::with_capacity(message.len());
        for &ch in message.as_bytes() {
            if ch == b' ' {
                out.push(' ');
            } else {
                out.push(table[(ch - b'a') as usize] as char);
            }
        }
        out
    }
}
