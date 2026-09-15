impl Solution {
    pub fn max_turbulence_size(arr: Vec<i32>) -> i32 {
        // Single sweep with a running sign state: a comparison that flips
        // the previous sign extends the turbulent run, a repeat or an
        // equal pair restarts it at the appropriate short length.
        let mut best = 1;
        let mut run = 1;
        let mut prev_sign = 0; // sign of the previous comparison: -1, 0, or 1
        for i in 1..arr.len() {
            let sign = if arr[i] > arr[i - 1] {
                1
            } else if arr[i] < arr[i - 1] {
                -1
            } else {
                0
            };
            if sign == 0 {
                run = 1;
            } else if sign == -prev_sign {
                run += 1;
            } else {
                run = 2;
            }
            prev_sign = sign;
            // A run only reaches its full length at its last element, so
            // tracking the best while it grows misses nothing.
            best = best.max(run);
        }
        best
    }
}
