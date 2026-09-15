impl Solution {
    pub fn confusing_number_ii(n: i32) -> i32 {
        // DFS over the valid digits (0,1,6,8,9; no leading zero), pruning
        // once the value exceeds n. The rotated value is carried
        // incrementally: appending digit d to a k-digit value shifts the
        // old rotation one place left and prepends rot180(d).
        let digits: [i64; 5] = [0, 1, 6, 8, 9];
        let rot: [i64; 10] = [0, 1, -1, -1, -1, -1, 9, -1, 8, 6];
        let mut pow10 = [0i64; 11];
        pow10[0] = 1;
        for i in 1..11 {
            pow10[i] = pow10[i - 1] * 10;
        }
        let limit = n as i64;

        fn dfs(
            cur: i64,
            rotated: i64,
            ndigits: usize,
            limit: i64,
            digits: &[i64; 5],
            rot: &[i64; 10],
            pow10: &[i64; 11],
        ) -> i64 {
            if cur > limit {
                return 0;
            }
            let mut count = if cur > 0 && rotated != cur { 1 } else { 0 };
            for &d in digits {
                if cur == 0 && d == 0 {
                    continue;
                }
                let nxt = cur * 10 + d;
                if nxt <= limit {
                    count += dfs(
                        nxt,
                        rot[d as usize] * pow10[ndigits] + rotated,
                        ndigits + 1,
                        limit,
                        digits,
                        rot,
                        pow10,
                    );
                }
            }
            count
        }

        dfs(0, 0, 0, limit, &digits, &rot, &pow10) as i32
    }
}
