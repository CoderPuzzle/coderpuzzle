impl Solution {
    pub fn max_compatibility_sum(students: Vec<Vec<i32>>, mentors: Vec<Vec<i32>>) -> i32 {
        let m = students.len();
        // Precompute the m x m agreement counts so the DP touches only ints.
        let mut score = vec![vec![0i32; m]; m];
        for i in 0..m {
            for j in 0..m {
                let mut s = 0;
                for t in 0..students[i].len() {
                    if students[i][t] == mentors[j][t] {
                        s += 1;
                    }
                }
                score[i][j] = s;
            }
        }
        let full = 1usize << m;
        // dp[mask] = best total score matching the first popcount(mask)
        // students to exactly the mentors in mask; dp[0] = 0. The used-mentor
        // count alone pins down which student is placed next. Increasing
        // numeric order works because every submask is numerically smaller.
        let mut dp = vec![0i32; full];
        for mask in 1..full {
            let i = mask.count_ones() as usize - 1;
            let mut best = 0;
            for j in 0..m {
                if mask >> j & 1 == 1 {
                    // Mentor j was this student's match: extend the
                    // assignment without j by their pairwise score.
                    let v = dp[mask ^ (1 << j)] + score[i][j];
                    if v > best {
                        best = v;
                    }
                }
            }
            dp[mask] = best;
        }
        dp[full - 1]
    }
}
