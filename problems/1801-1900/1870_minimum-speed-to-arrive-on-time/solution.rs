impl Solution {
    pub fn min_speed_on_time(dist: Vec<i32>, hour: f64) -> i32 {
        let n = dist.len();
        // hour has at most two decimals; work in exact hundredths.
        let h = (hour * 100.0).round() as i64;
        let last = 100 * dist[n - 1] as i64;

        let on_time = |speed: i64| -> bool {
            // Every leg but the last must end on an integer hour (the next
            // train departs then), costing ceil(d/s); the final leg has no
            // successor and costs exactly d/s — compared here in hundredths.
            let mut c: i64 = 0;
            for i in 0..n - 1 {
                c += (dist[i] as i64 + speed - 1) / speed;
            }
            let budget = h - 100 * c;
            if budget < 0 {
                return false;
            }
            budget * speed >= last
        };

        // On-time is monotone in speed — if s works, every faster speed
        // works — so search for the smallest feasible s; 10^7 is the
        // guaranteed ceiling, and -1 if even it fails.
        let mut lo = 1i64;
        let mut hi = 10_000_000i64;
        if !on_time(hi) {
            return -1;
        }
        while lo < hi {
            let mid = (lo + hi) / 2;
            if on_time(mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }
}
