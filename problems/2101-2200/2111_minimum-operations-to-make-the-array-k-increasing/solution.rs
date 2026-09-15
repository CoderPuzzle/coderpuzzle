impl Solution {
    pub fn k_increasing(arr: Vec<i32>, k: i32) -> i32 {
        let longest_nondecreasing = |seq: &[i32]| -> usize {
            // Patience trick: tails[l] is the smallest possible tail of a
            // non-decreasing subsequence of length l+1.
            let mut tails: Vec<i32> = Vec::new();
            for &value in seq {
                // partition_point finds the first tail strictly greater than
                // value — equal elements extend the subsequence instead of
                // replacing, which is what makes it non-decreasing.
                let pos = tails.partition_point(|&x| x <= value);
                if pos == tails.len() {
                    tails.push(value);
                } else {
                    tails[pos] = value;
                }
            }
            tails.len()
        };

        let mut operations = 0usize;
        // arr[i-k] <= arr[i] only relates indices congruent mod k, so each
        // residue class is an independent subsequence. Keep its LNDS and
        // rewrite the rest; values are free, so completion always succeeds.
        for start in 0..k as usize {
            let sub: Vec<i32> = arr[start..].iter().step_by(k as usize).copied().collect();
            operations += sub.len() - longest_nondecreasing(&sub);
        }
        operations as i32
    }
}
