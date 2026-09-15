impl Solution {
    pub fn winner_of_game(colors: String) -> bool {
        let bytes = colors.as_bytes();
        let mut alice_moves = 0;
        let mut bob_moves = 0;

        for i in 1..bytes.len().saturating_sub(1) {
            if bytes[i - 1] == bytes[i] && bytes[i] == bytes[i + 1] {
                if bytes[i] == b'A' {
                    alice_moves += 1;
                } else {
                    bob_moves += 1;
                }
            }
        }

        alice_moves > bob_moves
    }
}
