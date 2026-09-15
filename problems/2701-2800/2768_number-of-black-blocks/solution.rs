use std::collections::HashMap;

impl Solution {
    pub fn count_black_blocks(m: i32, n: i32, coordinates: Vec<Vec<i32>>) -> Vec<i64> {
        let mut counts: HashMap<i64, i32> = HashMap::new();
        for coordinate in &coordinates {
            let x = coordinate[0];
            let y = coordinate[1];
            for bx in x - 1..=x {
                for by in y - 1..=y {
                    if bx >= 0 && bx < m - 1 && by >= 0 && by < n - 1 {
                        *counts.entry(bx as i64 * n as i64 + by as i64).or_insert(0) += 1;
                    }
                }
            }
        }
        let mut answer = vec![0_i64; 5];
        answer[0] = (m as i64 - 1) * (n as i64 - 1) - counts.len() as i64;
        for count in counts.values() {
            answer[*count as usize] += 1;
        }
        answer
    }
}
