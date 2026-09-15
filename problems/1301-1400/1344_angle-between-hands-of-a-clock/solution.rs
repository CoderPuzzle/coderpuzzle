impl Solution {
    pub fn angle_clock(hour: i32, minutes: i32) -> f64 {
        // Hour hand: 30 degrees per hour plus 0.5 per minute; minute hand:
        // 6 per minute. The two vertical angles sum to 360, so fold.
        let hour_pos = 30.0 * ((hour % 12) as f64) + 0.5 * minutes as f64;
        let minute_pos = 6.0 * minutes as f64;
        let diff = (hour_pos - minute_pos).abs();
        diff.min(360.0 - diff)
    }
}
