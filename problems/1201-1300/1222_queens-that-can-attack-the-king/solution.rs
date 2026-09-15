impl Solution {
    pub fn queens_attackthe_king(queens: Vec<Vec<i32>>, king: Vec<i32>) -> Vec<Vec<i32>> {
        let mut board = [[false; 8]; 8];
        for queen in &queens {
            board[queen[0] as usize][queen[1] as usize] = true;
        }
        let mut out = Vec::new();
        for dx in [-1, 0, 1] {
            for dy in [-1, 0, 1] {
                if dx == 0 && dy == 0 {
                    continue;
                }
                // First queen on each ray attacks; she also blocks the rest.
                let mut x = king[0] + dx;
                let mut y = king[1] + dy;
                while (0..8).contains(&x) && (0..8).contains(&y) {
                    if board[x as usize][y as usize] {
                        out.push(vec![x, y]);
                        break;
                    }
                    x += dx;
                    y += dy;
                }
            }
        }
        out
    }
}
