impl Solution {
    // Operation k removes the largest remaining number of every row, so
    // after each row is sorted in decreasing order the k-th column holds
    // exactly what that row gives up in operation k — the score is the
    // sum of the column maxima, with already-emptied rows skipped.
    pub fn matrix_sum(mut nums: Vec<Vec<i32>>) -> i32 {
        let mut width = 0;
        for row in nums.iter_mut() {
            row.sort_unstable_by(|a, b| b.cmp(a));
            width = width.max(row.len());
        }
        let mut score = 0;
        for column in 0..width {
            let mut best = i32::MIN;
            for row in &nums {
                if column < row.len() && row[column] > best {
                    best = row[column];
                }
            }
            score += best;
        }
        score
    }
}
