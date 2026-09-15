impl Solution {
    pub fn k_weakest_rows(mat: Vec<Vec<i32>>, k: i32) -> Vec<i32> {
        // Weakness order == lexicographic order of (soldiers, index); rows
        // are all 1's then 0's, so the sum is the first-civilian index too.
        let mut ranked: Vec<(i32, i32)> = mat
            .iter()
            .enumerate()
            .map(|(index, row)| (row.iter().sum::<i32>(), index as i32))
            .collect();
        ranked.sort_unstable();
        ranked.iter().take(k as usize).map(|(_, index)| *index).collect()
    }
}
