use std::collections::HashSet;

impl Solution {
    pub fn distinct_points(s: String, k: i32) -> i32 {
        let bytes = s.as_bytes();
        let n = bytes.len();
        let k = k as usize;
        // Moves add like vectors, so the endpoint left after deleting a
        // window is the full-walk endpoint minus the window's own
        // displacement — only window sums matter, never the re-walk.
        let dxy = |c: u8| match c {
            b'L' => (-1i32, 0i32),
            b'R' => (1, 0),
            b'D' => (0, -1),
            _ => (0, 1),
        };
        let mut total = (0, 0);
        for &c in bytes {
            let (dx, dy) = dxy(c);
            total.0 += dx;
            total.1 += dy;
        }
        // Slide the length-k window, updating its displacement in O(1) per
        // step — drop the outgoing move, pick up the incoming one — and
        // collect the endpoint every deletion produces.
        let mut window = (0, 0);
        for &c in &bytes[..k] {
            let (dx, dy) = dxy(c);
            window.0 += dx;
            window.1 += dy;
        }
        let mut seen = HashSet::new();
        for i in 0..=n - k {
            seen.insert((total.0 - window.0, total.1 - window.1));
            if i + k < n {
                let out = dxy(bytes[i]);
                let inc = dxy(bytes[i + k]);
                window.0 += inc.0 - out.0;
                window.1 += inc.1 - out.1;
            }
        }
        seen.len() as i32
    }
}
