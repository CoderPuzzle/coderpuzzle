impl Solution {
    pub fn winning_player(x: i32, y: i32) -> String {
        // 75a + 10b = 115 has the single non-negative solution a=1, b=4
        // (15a + 2b = 23 forces a odd and a < 2), so every move is forced:
        // one 75-coin and four 10-coins off the table, no choices to weigh.
        // Play therefore lasts exactly min(x, y / 4) moves; the player who
        // cannot move loses, so Alice wins iff she makes the last move.
        if x.min(y / 4) % 2 == 1 {
            "Alice".to_string()
        } else {
            "Bob".to_string()
        }
    }
}
