impl Solution {
    pub fn num_ways(s: String) -> i32 {
        // A split into three equal-ones parts only exists when the total
        // number of '1's is a multiple of 3. With `total == 0` every
        // character is '0', so any pair of the n - 1 gaps between
        // characters is a valid pair of cut points: C(n - 1, 2) ways
        // (accumulated as i64 since n can reach 1e5). Otherwise, record
        // the positions of every '1'; the first cut may land anywhere
        // between the k-th and (k + 1)-th one (a run of trailing zeros
        // widens that window), and likewise the second cut between the
        // 2k-th and (2k + 1)-th one. The two windows never overlap, so
        // the answer is the product of their widths.
        const MOD: i64 = 1_000_000_007;
        let bytes = s.as_bytes();
        let n = bytes.len();
        let ones_idx: Vec<i64> = bytes
            .iter()
            .enumerate()
            .filter(|&(_, &b)| b == b'1')
            .map(|(i, _)| i as i64)
            .collect();
        let total = ones_idx.len();
        if total % 3 != 0 {
            return 0;
        }
        if total == 0 {
            let ways = (n as i64 - 1) * (n as i64 - 2) / 2;
            return (ways % MOD) as i32;
        }
        let k = total / 3;
        let left = ones_idx[k] - ones_idx[k - 1];
        let right = ones_idx[2 * k] - ones_idx[2 * k - 1];
        ((left * right) % MOD) as i32
    }
}
