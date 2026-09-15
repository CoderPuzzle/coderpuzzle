impl Solution {
    pub fn maximum_subarray_xor(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // One round of the score process turns an array into its adjacent
        // XORs, so unrolling the rounds gives a Pascal-style recurrence
        // over GF(2): score[l][r] = score[l][r-1] ^ score[l+1][r], seeded
        // by the singleton subarrays — binomial coefficients mod 2 decide
        // which elements reach the final XOR. On top of the score rows we
        // fold a running maximum: best[l][r], the largest score of any
        // subarray inside [l..r], splits by endpoints into max(score[l][r],
        // best[l][r-1], best[l+1][r]) — any such subarray either drops the
        // left end, drops the right end, or is [l..r] itself. Rows are
        // built for l = n-1 down to 0, keeping only the previous score row
        // while every finished best row is stored, so a query is one lookup
        // into its left endpoint's row: O(n^2 + q) time and O(n^2) stored
        // cells (~8 MB of i32 cells at n=2000). Every element is at most
        // 2^31 - 1, so bit 31 is always 0, and the XOR of two bit-31-zero
        // words has bit 31 zero too — by induction every score lies in
        // [0, 2^31 - 1], so i32 storage never overflows.
        let n = nums.len();
        let mut best_rows: Vec<Vec<i32>> = vec![Vec::new(); n];
        let mut prev_score: Vec<i32> = Vec::new();
        let mut prev_best: Vec<i32> = Vec::new();
        for left in (0..n).rev() {
            let width = n - left;
            let mut cur_score = vec![0i32; width];
            let mut cur_best = vec![0i32; width];
            cur_score[0] = nums[left];
            cur_best[0] = nums[left];
            for j in 1..width {
                let s = cur_score[j - 1] ^ prev_score[j - 1];
                cur_score[j] = s;
                cur_best[j] = s.max(cur_best[j - 1]).max(prev_best[j - 1]);
            }
            best_rows[left] = cur_best.clone();
            prev_best = cur_best;
            prev_score = cur_score;
        }
        queries
            .iter()
            .map(|query| best_rows[query[0] as usize][(query[1] - query[0]) as usize])
            .collect()
    }
}
