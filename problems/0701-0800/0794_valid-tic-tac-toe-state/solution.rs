// Reachability folds into three facts about the final position. X moves
// first and play strictly alternates, so the counts must satisfy
// x == o or x == o + 1. The game stops at the first completed line, so
// at most one player holds a winning row, column, or diagonal — and the
// winner's decisive placement pins the tally exactly: X's winning move
// leaves x == o + 1, O's leaves x == o. A board passing all three gates
// was played; any other board is unreachable.
impl Solution {
    pub fn valid_tic_tac_toe(board: Vec<String>) -> bool {
        let cells: String = board.concat();
        let x = cells.matches('X').count();
        let o = cells.matches('O').count();
        if x != o && x != o + 1 {
            return false;
        }
        let lines = [
            (0, 1, 2),
            (3, 4, 5),
            (6, 7, 8),
            (0, 3, 6),
            (1, 4, 7),
            (2, 5, 8),
            (0, 4, 8),
            (2, 4, 6),
        ];
        // The alphabet is 'X', 'O', ' ' — pure ASCII — so byte
        // comparison is character comparison.
        let wins = |player: u8| {
            lines.iter().any(|&(a, b, c)| {
                cells.as_bytes()[a] == player && cells.as_bytes()[b] == player && cells.as_bytes()[c] == player
            })
        };
        let xwin = wins(b'X');
        let owin = wins(b'O');
        !(xwin && owin) && !(xwin && x != o + 1) && !(owin && x != o)
    }
}
