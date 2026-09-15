impl Solution {
    pub fn max_balanced_shipments(weight: Vec<i32>) -> i32 {
        // A run is balanced exactly where its last parcel is strictly
        // lighter than the run's heaviest parcel, so one sweep tracks the
        // open segment's maximum and closes on the first dip.
        let mut shipments = 0;
        let mut segment_max = 0;
        for &w in &weight {
            if w < segment_max {
                // Closing here is never worse than waiting: delaying the
                // reset only shrinks what later segments could use.
                shipments += 1;
                segment_max = 0;
            } else if w > segment_max {
                segment_max = w;
            }
        }
        shipments
    }
}
