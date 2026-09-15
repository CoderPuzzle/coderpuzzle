use std::collections::HashMap;

impl Solution {
    pub fn max_equal_rows_after_flips(matrix: Vec<Vec<i32>>) -> i32 {
        // column flips XOR one fixed mask onto every row at once, so a row
        // turns uniform iff it equals the mask or its complement: exactly
        // the identical-or-complementary rows can be fixed together
        let mut counts: HashMap<Vec<i32>, i32> = HashMap::new();
        let mut best = 0;
        for row in &matrix {
            // canonical key: every cell XOR the row's own first cell —
            // identical rows and complementary rows collapse to one key
            let key: Vec<i32> = row.iter().map(|&value| value ^ row[0]).collect();
            let next = counts.entry(key).or_insert(0);
            *next += 1;
            best = best.max(*next);
        }
        best
    }
}
