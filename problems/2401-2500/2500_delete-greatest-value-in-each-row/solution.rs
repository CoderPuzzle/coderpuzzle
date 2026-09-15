impl Solution {
    pub fn delete_greatest_value(grid: Vec<Vec<i32>>) -> i32 {
        // Sorting each row descending settles in one shot what every round
        // would delete from it: round k takes each row's k-th largest value.
        // The round's contribution is then just the max over rows of that
        // k-th largest -- no heap or marking simulation needed.
        let mut rows: Vec<Vec<i32>> = grid
            .into_iter()
            .map(|mut row| {
                row.sort_unstable_by(|a, b| b.cmp(a));
                row
            })
            .collect();
        let mut answer = 0;
        for j in 0..rows[0].len() {
            answer += rows.iter().map(|row| row[j]).max().unwrap();
        }
        answer
    }
}
