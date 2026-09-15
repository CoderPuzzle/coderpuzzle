impl Solution {
    pub fn can_make_square(grid: Vec<Vec<String>>) -> bool {
        // A 2x2 square becomes monochrome with at most one recolor exactly
        // when it is not split 2-2, i.e. one color already owns at least
        // three of its four cells; a single flip then absorbs the odd cell
        // out. Four candidate squares to check.
        let count_black = |r: usize, c: usize| -> usize {
            let mut black = 0;
            for dr in 0..2 {
                for dc in 0..2 {
                    if grid[r + dr][c + dc] == "B" {
                        black += 1;
                    }
                }
            }
            black
        };
        for r in 0..2 {
            for c in 0..2 {
                if count_black(r, c) != 2 {
                    return true;
                }
            }
        }
        false
    }
}
