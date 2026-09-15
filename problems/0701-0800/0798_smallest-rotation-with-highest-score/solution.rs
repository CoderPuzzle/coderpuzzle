impl Solution {
    pub fn best_rotation(nums: Vec<i32>) -> i32 {
        // Difference array over rotations: each element earns its point on a
        // contiguous range of k, so per-element +1/-1 marks and one prefix
        // pass rebuild every rotation's score without rotating anything.
        let n = nums.len();
        let mut diff = vec![0i32; n + 1];
        for (i, &raw) in nums.iter().enumerate() {
            let v = raw as usize; // the constraints guarantee 0 <= v < n
            if v <= i {
                // Scores at k in [0, i - v] and again at every k past i.
                diff[0] += 1;
                diff[i - v + 1] -= 1;
                if i + 1 < n {
                    diff[i + 1] += 1;
                }
            } else {
                // Scores only after wrapping, at k in [i + 1, i + n - v].
                diff[i + 1] += 1;
                diff[i + n - v + 1] -= 1;
            }
        }
        let mut best_k = 0;
        let mut best = -1;
        let mut score = 0i32;
        for k in 0..n {
            score += diff[k];
            // Strict > keeps the earliest k on ties, which the problem demands.
            if score > best {
                best = score;
                best_k = k as i32;
            }
        }
        best_k
    }
}
