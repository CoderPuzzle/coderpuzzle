impl Solution {
    pub fn corp_flight_bookings(bookings: Vec<Vec<i32>>, n: i32) -> Vec<i32> {
        let n = n as usize;
        // difference array (n + 1 slots keeps the stamp at index last in
        // bounds when last == n): each booking costs two writes instead of
        // touching every flight in [first, last]
        let mut diff = vec![0i32; n + 1];
        for b in &bookings {
            diff[(b[0] - 1) as usize] += b[2];
            // -seats one slot past the range end, so flight `last` still
            // sees the seats and every later flight does not
            diff[b[1] as usize] -= b[2];
        }
        // one prefix sum over the stamps: each +/- pair cancels exactly
        // beyond its range, so the running total is each flight's occupancy
        let mut answer = Vec::with_capacity(n);
        let mut running = 0i32;
        for i in 0..n {
            running += diff[i];
            answer.push(running);
        }
        answer
    }
}
