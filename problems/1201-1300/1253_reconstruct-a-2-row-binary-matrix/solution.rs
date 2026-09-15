impl Solution {
    pub fn reconstruct_matrix(upper: i32, lower: i32, colsum: Vec<i32>) -> Vec<Vec<i32>> {
        let n = colsum.len();
        let twos = colsum.iter().filter(|&&s| s == 2).count() as i32;
        let ones = colsum.iter().filter(|&&s| s == 1).count() as i32;
        // Every 2 spends one from each row; the top row cannot exceed its cap.
        if 2 * twos + ones != upper + lower || upper < twos || upper > twos + ones {
            return vec![];
        }
        // First (upper - twos) free columns go on top; nothing else is chosen.
        let mut free_top = upper - twos;
        let mut top = vec![0i32; n];
        let mut bottom = vec![0i32; n];
        for i in 0..n {
            if colsum[i] == 2 {
                top[i] = 1;
                bottom[i] = 1;
            } else if colsum[i] == 1 {
                if free_top > 0 {
                    top[i] = 1;
                    free_top -= 1;
                } else {
                    bottom[i] = 1;
                }
            }
        }
        vec![top, bottom]
    }
}
