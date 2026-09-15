impl Solution {
    pub fn sequence_reconstruction(nums: Vec<i32>, sequences: Vec<Vec<i32>>) -> bool {
        // Consecutive elements of a sequence pin an adjacency: every shortest
        // supersequence is a permutation of [1, n] keeping each such pair in
        // order, so nums is the unique one exactly when the pinned pairs chain
        // all of nums together in nums's own order.
        let n = nums.len();
        let mut pos = vec![0usize; n + 1];
        for (i, &x) in nums.iter().enumerate() {
            pos[x as usize] = i;
        }
        // covered[i] is set once some sequence places nums[i + 1] directly
        // after nums[i]; with n == 1 there is nothing to pin.
        let mut covered = vec![false; n - 1];
        for seq in &sequences {
            for &x in seq {
                // A value outside [1, n] cannot occur in nums at all, so nums
                // is not even a supersequence.
                if x < 1 || x > n as i32 {
                    return false;
                }
            }
            for w in seq.windows(2) {
                let (u, v) = (pos[w[0] as usize], pos[w[1] as usize]);
                // A pair running backwards in nums means its sequence never
                // embeds in nums.
                if u >= v {
                    return false;
                }
                if v == u + 1 {
                    covered[u] = true;
                }
            }
        }
        // An unpinned adjacency could be flipped into another permutation of
        // the same length, so uniqueness needs every slot pinned.
        covered.iter().all(|&pinned| pinned)
    }
}
