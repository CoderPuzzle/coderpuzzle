impl Solution {
    pub fn largest_altitude(gain: Vec<i32>) -> i32 {
        // The altitude at point i is the prefix sum gain[0] + ... +
        // gain[i-1], with point 0 itself sitting at altitude 0. Walk the
        // trip once carrying the running altitude, and seed the best
        // with that starting 0 so a trip that never climbs above its
        // start still reports 0.
        let (mut altitude, mut best) = (0, 0);
        for &g in &gain {
            altitude += g;
            best = best.max(altitude);
        }
        best
    }
}
