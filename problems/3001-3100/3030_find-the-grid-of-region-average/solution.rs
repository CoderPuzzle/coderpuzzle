impl Solution {
    pub fn result_grid(image: Vec<Vec<i32>>, threshold: i32) -> Vec<Vec<i32>> {
        let m = image.len();
        let n = image[0].len();
        if m < 3 || n < 3 {
            return image;
        }
        // Fold the twelve adjacent-pair tests once: calm_h[r][c] says row r is
        // horizontally calm across columns c..c+2, calm_v[r][c] says column c
        // is vertically calm across rows r..r+2.
        let mut calm_h = vec![vec![false; n - 2]; m];
        let mut calm_v = vec![vec![false; n]; m - 2];
        for (r, row) in image.iter().enumerate() {
            for c in 0..n - 2 {
                let left = (row[c] - row[c + 1]).abs() <= threshold;
                let right = (row[c + 1] - row[c + 2]).abs() <= threshold;
                calm_h[r][c] = left && right;
            }
        }
        for c in 0..n {
            for r in 0..m - 2 {
                let top = (image[r][c] - image[r + 1][c]).abs() <= threshold;
                let bot = (image[r + 1][c] - image[r + 2][c]).abs() <= threshold;
                calm_v[r][c] = top && bot;
            }
        }
        // Prefix sums give each window's nine-cell total in constant time; a
        // full 500 x 500 image of 255s keeps every entry below 2^31.
        let mut pref = vec![vec![0i32; n + 1]; m + 1];
        for r in 0..m {
            for c in 0..n {
                pref[r + 1][c + 1] = pref[r][c + 1] + pref[r + 1][c] - pref[r][c] + image[r][c];
            }
        }
        let mut sum = vec![vec![0i32; n]; m];
        let mut count = vec![vec![0i32; n]; m];
        for i in 0..m - 2 {
            for j in 0..n - 2 {
                if !calm_h[i][j] || !calm_h[i + 1][j] || !calm_h[i + 2][j] {
                    continue;
                }
                if !calm_v[i][j] || !calm_v[i][j + 1] || !calm_v[i][j + 2] {
                    continue;
                }
                let avg = (pref[i + 3][j + 3] - pref[i][j + 3] - pref[i + 3][j] + pref[i][j]) / 9;
                for r in i..i + 3 {
                    for c in j..j + 3 {
                        sum[r][c] += avg;
                        count[r][c] += 1;
                    }
                }
            }
        }
        let mut result = vec![vec![0i32; n]; m];
        for r in 0..m {
            for c in 0..n {
                result[r][c] = if count[r][c] > 0 {
                    sum[r][c] / count[r][c]
                } else {
                    image[r][c]
                };
            }
        }
        result
    }
}
