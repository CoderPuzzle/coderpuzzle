#[derive(Clone, Copy)]
struct ChessMove {
    dr: i32,
    dc: i32,
    steps: i32,
}

impl Solution {
    pub fn count_combinations(pieces: Vec<String>, positions: Vec<Vec<i32>>) -> i32 {
        let options: Vec<Vec<ChessMove>> = pieces
            .iter()
            .zip(&positions)
            .map(|(piece, position)| Self::chess_moves(piece, position))
            .collect();
        Self::search(0, &positions, &options, &mut Vec::with_capacity(pieces.len()))
    }

    fn chess_moves(piece: &str, position: &[i32]) -> Vec<ChessMove> {
        let orthogonal = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        let diagonal = [(1, 1), (1, -1), (-1, 1), (-1, -1)];
        let mut directions = Vec::with_capacity(8);
        if piece != "bishop" {
            directions.extend_from_slice(&orthogonal);
        }
        if piece != "rook" {
            directions.extend_from_slice(&diagonal);
        }
        let mut moves = vec![ChessMove { dr: 0, dc: 0, steps: 0 }];
        for (dr, dc) in directions {
            let mut steps = 1;
            loop {
                let row = position[0] + dr * steps;
                let column = position[1] + dc * steps;
                if row < 1 || row > 8 || column < 1 || column > 8 {
                    break;
                }
                moves.push(ChessMove { dr, dc, steps });
                steps += 1;
            }
        }
        moves
    }

    fn search(index: usize, positions: &[Vec<i32>], options: &[Vec<ChessMove>], chosen: &mut Vec<ChessMove>) -> i32 {
        if index == options.len() {
            return 1;
        }
        let mut total = 0;
        for &chess_move in &options[index] {
            let valid = (0..index).all(|other| Self::compatible(index, chess_move, other, chosen[other], positions));
            if valid {
                chosen.push(chess_move);
                total += Self::search(index + 1, positions, options, chosen);
                chosen.pop();
            }
        }
        total
    }

    fn compatible(
        index: usize,
        chess_move: ChessMove,
        other: usize,
        other_move: ChessMove,
        positions: &[Vec<i32>],
    ) -> bool {
        for second in 0..=7 {
            let row = positions[index][0] + chess_move.dr * second.min(chess_move.steps);
            let column = positions[index][1] + chess_move.dc * second.min(chess_move.steps);
            let other_row = positions[other][0] + other_move.dr * second.min(other_move.steps);
            let other_column = positions[other][1] + other_move.dc * second.min(other_move.steps);
            if row == other_row && column == other_column {
                return false;
            }
        }
        true
    }
}
