impl Solution {
    pub fn max_points_inside_square(points: Vec<Vec<i32>>, s: String) -> i32 {
        // A square centred at the origin takes exactly the points whose
        // Chebyshev radius max(|x|, |y|) is within its half side, so valid
        // squares correspond to prefixes of the order sorted by radius --
        // an entire equal-radius block sits inside or out as one. Sweep
        // blocks outward holding a global seen-tag table; a block that
        // repeats a tag inside itself or against earlier blocks is where
        // every larger square breaks, so the count gathered before it is
        // optimal.
        let bytes = s.as_bytes();
        let radius = |i: usize| -> i32 {
            let x = points[i][0].abs();
            let y = points[i][1].abs();
            if x > y {
                x
            } else {
                y
            }
        };
        let n = points.len();
        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by_key(|&i| radius(i));
        let mut seen = [false; 26];
        let mut run = 0usize;
        let mut i = 0usize;
        while i < n {
            let mut j = i;
            while j < n && radius(order[j]) == radius(order[i]) {
                j += 1;
            }
            let mut block = [false; 26];
            let mut ok = true;
            for k in i..j {
                let bit = (bytes[order[k]] - b'a') as usize;
                if seen[bit] || block[bit] {
                    ok = false;
                    break;
                }
                block[bit] = true;
            }
            if !ok {
                return run as i32;
            }
            for b in 0..26 {
                if block[b] {
                    seen[b] = true;
                }
            }
            run += j - i;
            i = j;
        }
        run as i32
    }
}
