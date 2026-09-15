impl Solution {
    pub fn tour_of_knight(m: i32, n: i32, r: i32, c: i32) -> Vec<Vec<i32>> {
        let (m, n) = (m as usize, n as usize);
        let moves: [(i32, i32); 8] = [(1, 2), (2, 1), (2, -1), (1, -2), (-1, -2), (-2, -1), (-2, 1), (-1, 2)];
        let mut board = vec![vec![-1; n]; m];
        board[r as usize][c as usize] = 0;
        walk(&mut board, m, n, &moves, r, c, 1);
        board
    }
}

fn onward(board: &[Vec<i32>], m: usize, n: usize, moves: &[(i32, i32); 8], row: i32, col: i32) -> usize {
    moves
        .iter()
        .filter(|&&(dr, dc)| {
            let (nr, nc) = (row + dr, col + dc);
            nr >= 0 && nr < m as i32 && nc >= 0 && nc < n as i32 && board[nr as usize][nc as usize] == -1
        })
        .count()
}

fn walk(board: &mut [Vec<i32>], m: usize, n: usize, moves: &[(i32, i32); 8], row: i32, col: i32, order: i32) -> bool {
    if order as usize == m * n {
        return true;
    }
    let mut choices: Vec<(usize, i32, i32)> = Vec::new();
    for &(dr, dc) in moves.iter() {
        let (nr, nc) = (row + dr, col + dc);
        if nr >= 0 && nr < m as i32 && nc >= 0 && nc < n as i32 && board[nr as usize][nc as usize] == -1 {
            choices.push((onward(board, m, n, moves, nr, nc), nr, nc));
        }
    }
    choices.sort_unstable();
    for (_, nr, nc) in choices {
        board[nr as usize][nc as usize] = order;
        if walk(board, m, n, moves, nr, nc, order + 1) {
            return true;
        }
        board[nr as usize][nc as usize] = -1;
    }
    false
}
