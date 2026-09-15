impl Solution {
    pub fn sort_the_students(mut score: Vec<Vec<i32>>, k: i32) -> Vec<Vec<i32>> {
        // Sort the rows by their column-k entry, largest first:
        // extracting a comparison key is O(1) row indexing. Scores are
        // pairwise distinct across the whole matrix, so ties never occur
        // and the descending order is unique.
        let col = k as usize;
        score.sort_by(|a, b| b[col].cmp(&a[col]));
        score
    }
}
