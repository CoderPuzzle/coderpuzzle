impl Solution {
    pub fn snakes_and_ladders(board: Vec<Vec<i32>>) -> i32 {
        // The game is an unweighted shortest-path search: squares are nodes
        // and dice rolls are edges of cost 1, so BFS from square 1 finds the
        // fewest moves. Flatten the board with the boustrophedon walk (bottom
        // row left to right, next row right to left, flipping each row up);
        // a roll landing on square s resolves to cells[s] when that entry is
        // not -1 and to s otherwise — exactly one mandatory teleport, never
        // chained, since the landing square is enqueued as an ordinary node.
        // Each node expands to the at-most-six destinations in
        // [curr + 1, min(curr + 6, n * n)], and an empty level means n * n
        // is unreachable.
        let n = board.len();
        let squares = n * n;
        let mut cells = vec![-1; squares + 1];
        let mut square = 1usize;
        for row_from_bottom in 0..n {
            let row = &board[n - 1 - row_from_bottom];
            for column in 0..n {
                cells[square] = if row_from_bottom % 2 == 0 {
                    row[column]
                } else {
                    row[n - 1 - column]
                };
                square += 1;
            }
        }
        let mut visited = vec![false; squares + 1];
        visited[1] = true;
        let mut current = vec![1usize];
        let mut moves = 0i32;
        while !current.is_empty() {
            moves += 1;
            let mut reachable: Vec<usize> = Vec::with_capacity(current.len() * 6);
            for &curr in &current {
                let furthest = (curr + 6).min(squares);
                for next in curr + 1..=furthest {
                    let destination = if cells[next] != -1 { cells[next] as usize } else { next };
                    if destination == squares {
                        return moves;
                    }
                    if !visited[destination] {
                        visited[destination] = true;
                        reachable.push(destination);
                    }
                }
            }
            current = reachable;
        }
        -1
    }
}
