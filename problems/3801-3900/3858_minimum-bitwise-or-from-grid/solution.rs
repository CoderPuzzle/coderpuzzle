impl Solution {
    pub fn minimum_or(grid: Vec<Vec<i32>>) -> i32 {
        let mut forbidden = 0;
        let mut answer = 0;

        for bit in (0..=16).rev() {
            let candidate = forbidden | (1 << bit);
            let feasible = grid.iter().all(|row| row.iter().any(|&value| value & candidate == 0));
            if feasible {
                forbidden = candidate;
            } else {
                answer |= 1 << bit;
            }
        }

        answer
    }
}
