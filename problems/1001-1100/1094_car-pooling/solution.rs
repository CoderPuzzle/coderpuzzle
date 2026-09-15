impl Solution {
    pub fn car_pooling(trips: Vec<Vec<i32>>, capacity: i32) -> bool {
        // difference array over the bounded locations: each trip is just
        // two events, +passengers at pickup and -passengers at dropoff
        let mut diff = vec![0i32; 1001];
        for t in &trips {
            // dropoff lands at the exact end location, so during the sweep
            // it frees seats before any pickup at the same point
            diff[t[1] as usize] += t[0];
            diff[t[2] as usize] -= t[0];
        }
        // index order is the sweep: the running sum is the occupancy
        let mut used = 0i32;
        for delta in diff {
            used += delta;
            if used > capacity {
                return false;
            }
        }
        true
    }
}
