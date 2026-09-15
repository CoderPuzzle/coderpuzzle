impl Solution {
    pub fn calculate_minimum_hp(dungeon: Vec<Vec<i32>>) -> i32 {
        // need[j] is the least health that saves the knight from column j of
        // the row being folded; index n is a sentinel wall past the right edge.
        let n = dungeon[0].len();
        let mut need = vec![1_000_000_000; n + 1];
        need[n - 1] = 1;
        for row in dungeon.iter().rev() {
            for j in (0..n).rev() {
                // Scan right-to-left: need[j] is still the room below while
                // need[j + 1] is already this row, exactly the two moves.
                need[j] = (need[j].min(need[j + 1]) - row[j]).max(1);
            }
        }
        need[0]
    }
}
