impl Solution {
    // Manhattan distance is the max of sx*x + sy*y over the four quadrant
    // signings, and every step contributes +/-1 to that signing. Flipping
    // a misaligned step to an aligned one buys +2, so the best reachable
    // value at each prefix is cur + 2*min(k, mis).
    pub fn max_distance(s: String, k: i32) -> i32 {
        let mut best = 0i32;
        for sx in [1, -1] {
            for sy in [1, -1] {
                let (mut cur, mut mis) = (0i32, 0i32);
                for &b in s.as_bytes() {
                    let step = match b {
                        b'N' => sy,
                        b'S' => -sy,
                        b'E' => sx,
                        _ => -sx,
                    };
                    cur += step;
                    if step < 0 {
                        mis += 1;
                    }
                    best = best.max(cur + 2 * k.min(mis));
                }
            }
        }
        best
    }
}
