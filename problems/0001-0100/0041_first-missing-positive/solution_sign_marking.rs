impl Solution {
    pub fn first_missing_positive(mut nums: Vec<i32>) -> i32 {
        let n = nums.len() as i32;
        // The answer lies in [1, n+1], so slot v-1 can double as the "value v
        // is present" flag. First free the sign channel: replace every
        // non-positive with n+1, which is positive (so it never masquerades
        // as a mark) and outside the window (so it never places one).
        for i in 0..nums.len() {
            if nums[i] <= 0 {
                nums[i] = n + 1;
            }
        }
        for i in 0..nums.len() {
            // Read v = abs(nums[i]); the abs is needed because marks laid
            // down earlier in this pass may already have flipped the entry.
            // Negate nums[v-1] when v is in [1, n]. The > 0 guard makes
            // duplicates harmless: a flag set once is never re-flipped.
            let v = nums[i].abs();
            if v >= 1 && v <= n && nums[(v - 1) as usize] > 0 {
                nums[(v - 1) as usize] = -nums[(v - 1) as usize];
            }
        }
        // Three plain sweeps with no nesting: every slot is read and written
        // a constant number of times, so linearity needs no amortized
        // argument.
        for j in 0..nums.len() {
            // A slot still holding a positive was never marked: its index
            // names the smallest absent positive. All of 1..n marked means
            // the answer is n+1.
            if nums[j] > 0 {
                return j as i32 + 1;
            }
        }
        n + 1
    }
}
