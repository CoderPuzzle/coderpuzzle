impl Solution {
    pub fn distance_between_bus_stops(distance: Vec<i32>, start: i32, destination: i32) -> i32 {
        // Order the stops: edge i leads from stop i to stop i+1, so the
        // clockwise arc between them uses exactly the entries in between.
        let (lo, hi) = if start <= destination {
            (start as usize, destination as usize)
        } else {
            (destination as usize, start as usize)
        };
        let mut total: i64 = 0;
        let mut clockwise: i64 = 0;
        for (i, &d) in distance.iter().enumerate() {
            total += d as i64;
            if i >= lo && i < hi {
                clockwise += d as i64;
            }
        }
        let other = total - clockwise;
        clockwise.min(other) as i32
    }
}
