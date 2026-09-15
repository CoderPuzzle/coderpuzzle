impl Solution {
    pub fn minimum_moves(s: String) -> i32 {
        let bytes = s.as_bytes();
        let mut moves = 0;
        let mut index = 0;
        while index < bytes.len() {
            if bytes[index] == b'X' {
                moves += 1;
                index += 3;
            } else {
                index += 1;
            }
        }
        moves
    }
}
