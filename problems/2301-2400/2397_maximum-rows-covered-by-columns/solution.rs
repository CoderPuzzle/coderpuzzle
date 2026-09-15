impl Solution {
    // Encode rows as bitmasks; a set of selected columns covers a row
    // exactly when the row's mask is a subset of it. Enumerate every
    // mask with popcount == numSelect and keep the best count.
    pub fn maximum_rows(matrix: Vec<Vec<i32>>, num_select: i32) -> i32 {
        let n = matrix[0].len();
        let masks: Vec<u32> = matrix
            .iter()
            .map(|row| {
                row.iter()
                    .enumerate()
                    .fold(0u32, |acc, (j, &v)| if v == 1 { acc | (1 << j) } else { acc })
            })
            .collect();
        let mut best = 0i32;
        for sel in 0u32..(1u32 << n) {
            if sel.count_ones() != num_select as u32 {
                continue;
            }
            let covered = masks.iter().filter(|&&row| row & !sel == 0).count() as i32;
            best = best.max(covered);
        }
        best
    }
}
