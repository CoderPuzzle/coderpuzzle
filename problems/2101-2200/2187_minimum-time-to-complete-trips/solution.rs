impl Solution {
    pub fn minimum_time(time: Vec<i32>, total_trips: i32) -> i64 {
        let total_trips = total_trips as i64;
        let mn = time.iter().map(|&x| x as i64).min().unwrap();
        // Buses run independently: each finishes t / x trips by minute t, so
        // the floor-sum is the exact trip count — no simulation.
        let trips_done = |t: i64| -> i64 { time.iter().map(|&x| t / x as i64).sum() };
        // The completed-trip total is non-decreasing in t, so binary search
        // the first feasible minute; the fastest bus alone bounds the answer.
        let mut lo = 1i64;
        let mut hi = mn * total_trips;
        while lo < hi {
            let mid = (lo + hi) / 2;
            if trips_done(mid) >= total_trips {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }
}
