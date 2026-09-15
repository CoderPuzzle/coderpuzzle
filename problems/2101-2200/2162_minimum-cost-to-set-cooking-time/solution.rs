impl Solution {
    pub fn min_cost_set_time(startAt: i32, moveCost: i32, pushCost: i32, targetSeconds: i32) -> i32 {
        // Only minutes in [0, 99] whose implied seconds target - 60*minutes
        // also land in [0, 99] are settable at all; cost each survivor by
        // walking its digit sequence after normalization trims the zeroes
        // the microwave would otherwise prepend.
        let mut best = i32::MAX;
        for minutes in 0..100 {
            let seconds = targetSeconds - 60 * minutes;
            if !(0..=99).contains(&seconds) {
                continue;
            }
            let digits = [minutes / 10, minutes % 10, seconds / 10, seconds % 10];
            let mut start = 0;
            while start < 4 && digits[start] == 0 {
                start += 1;
            }
            let mut cost = 0;
            let mut finger = startAt;
            for &digit in &digits[start..] {
                if digit != finger {
                    cost += moveCost;
                    finger = digit;
                }
                cost += pushCost;
            }
            best = best.min(cost);
        }
        best
    }
}
