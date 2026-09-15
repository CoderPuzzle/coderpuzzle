impl Solution {
    pub fn max_distance(moves: String) -> i32 {
        let mut x = 0i32;
        let mut y = 0i32;
        let mut wildcard = 0i32;
        for move_ in moves.bytes() {
            match move_ {
                b'R' => x += 1,
                b'L' => x -= 1,
                b'U' => y += 1,
                b'D' => y -= 1,
                _ => wildcard += 1,
            }
        }
        x.abs() + y.abs() + wildcard
    }
}
