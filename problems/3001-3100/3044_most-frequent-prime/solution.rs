use std::collections::HashMap;

impl Solution {
    pub fn most_frequent_prime(mat: Vec<Vec<i32>>) -> i32 {
        // From every cell, march each of the eight directions straight to
        // the matrix edge; a path is fully described by its start and
        // direction.
        let directions = [
            (0i32, 1i32),
            (1, 1),
            (1, 0),
            (1, -1),
            (0, -1),
            (-1, -1),
            (-1, 0),
            (-1, 1),
        ];
        let m = mat.len() as i32;
        let n = mat[0].len() as i32;
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for i in 0..m {
            for j in 0..n {
                for &(di, dj) in directions.iter() {
                    let mut value: i64 = mat[i as usize][j as usize] as i64;
                    let mut x = i + di;
                    let mut y = j + dj;
                    while x >= 0 && x < m && y >= 0 && y < n {
                        // Appending one digit materializes the number formed
                        // at this step, so every step tallies on its own.
                        value = value * 10 + mat[x as usize][y as usize] as i64;
                        if value > 10 && Self::is_prime(value) {
                            *counts.entry(value as i32).or_insert(0) += 1;
                        }
                        x += di;
                        y += dj;
                    }
                }
            }
        }
        // Highest frequency wins, ties toward the larger prime; no candidate
        // at all leaves the answer at -1.
        let mut best_value = -1;
        let mut best_count = 0;
        for (&value, &count) in counts.iter() {
            if count > best_count || (count == best_count && value > best_value) {
                best_value = value;
                best_count = count;
            }
        }
        best_value
    }

    fn is_prime(value: i64) -> bool {
        if value % 2 == 0 {
            return value == 2;
        }
        let mut factor = 3i64;
        while factor * factor <= value {
            if value % factor == 0 {
                return false;
            }
            factor += 2;
        }
        true
    }
}
