impl Solution {
    pub fn min_abs_difference(nums: Vec<i32>, goal: i32) -> i32 {
        let subset_sums = |arr: &[i32]| -> Vec<i32> {
            // Doubling: each value extends the list with a shifted copy of
            // itself, turning t sums into 2t (0 included — empty set covered).
            let mut sums: Vec<i32> = vec![0];
            for &value in arr {
                let size = sums.len();
                for j in 0..size {
                    let s = sums[j];
                    sums.push(s + value);
                }
            }
            sums
        };

        // Meet in the middle: 2^40 is hopeless, but two halves of <= 20
        // elements enumerate ~10^6 sums each, and every subsequence sum is
        // sL + sR with one part from each side.
        let half = nums.len() / 2;
        let mut left = subset_sums(&nums[..half]);
        let right = subset_sums(&nums[half..]);
        left.sort_unstable();
        let mut best: Option<i32> = None;
        for s in right {
            // The best partner is the left sum nearest goal - s; anything
            // other than the floor and ceiling around the insertion point
            // lies strictly farther away.
            let need = goal - s;
            let idx = left.partition_point(|&x| x < need);
            for j in [idx.wrapping_sub(1), idx] {
                if j < left.len() {
                    let diff = (left[j] + s - goal).abs();
                    if best.is_none() || diff < best.unwrap() {
                        best = Some(diff);
                    }
                }
            }
        }
        best.unwrap()
    }
}
