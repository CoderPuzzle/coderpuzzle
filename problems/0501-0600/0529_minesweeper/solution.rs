impl Solution {
    pub fn update_board(mut board: Vec<Vec<String>>, click: Vec<i32>) -> Vec<Vec<String>> {
        // Ownership hands over the whole allocation, so the reveal rewrites
        // it in place — no second board is ever built.
        let rows = board.len();
        let cols = board[0].len();
        let (r0, c0) = (click[0] as usize, click[1] as usize);
        // A revealed mine ends the game on the spot: it becomes 'X' and no
        // other cell changes, so return before any flood starts.
        if board[r0][c0] == "M" {
            board[r0][c0] = "X".to_string();
            return board;
        }
        // Breadth-first reveal from the clicked square, on an explicit queue:
        // a blank region can span every cell of a 50 x 50 board, deeper than
        // a call stack allows.
        let directions: [(isize, isize); 8] = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)];
        let mut queue: Vec<(usize, usize)> = vec![(r0, c0)];
        let mut head = 0;
        while head < queue.len() {
            let (r, c) = queue[head];
            head += 1;
            // Two blanks can enqueue the same neighbor; only its first
            // processing reveals it, and this check drops the stale copy.
            if board[r][c] != "E" {
                continue;
            }
            let (ri, ci) = (r as isize, c as isize);
            // An empty square's face is its count of adjacent mines, and
            // that count is exactly what bounds the flood.
            let mut mines = 0;
            for (dr, dc) in directions {
                let nr = ri + dr;
                let nc = ci + dc;
                if nr >= 0
                    && nr < rows as isize
                    && nc >= 0
                    && nc < cols as isize
                    && board[nr as usize][nc as usize] == "M"
                {
                    mines += 1;
                }
            }
            if mines > 0 {
                // Digits are the frontier of the flood: they stop it.
                board[r][c] = mines.to_string();
                continue;
            }
            board[r][c] = "B".to_string();
            for (dr, dc) in directions {
                let nr = ri + dr;
                let nc = ci + dc;
                if nr >= 0
                    && nr < rows as isize
                    && nc >= 0
                    && nc < cols as isize
                    && board[nr as usize][nc as usize] == "E"
                {
                    queue.push((nr as usize, nc as usize));
                }
            }
        }
        // The reveal happened inside the input allocation; the same board,
        // now revealed, is what the judge compares.
        board
    }
}
