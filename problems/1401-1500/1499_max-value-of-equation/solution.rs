impl Solution {
    pub fn find_max_value_of_equation(points: Vec<Vec<i32>>, k: i32) -> i32 {
        let n = points.len();
        let (k, mut best) = (k as i64, i64::MIN);
        // x is sorted increasing, so for i < j the equation value is
        // yj + xj + (yi - xi): the best partner maximizes the key y - x,
        // turning this into a sliding-window max over that key (deque kept
        // with y - x strictly decreasing, front = best candidate)
        let mut dq: Vec<usize> = Vec::with_capacity(n);
        let mut head = 0usize;
        for j in 0..n {
            let (xj, yj) = (points[j][0] as i64, points[j][1] as i64);
            // drop stale front: x only grows, so anything beyond k behind
            // the current j is beyond k for every later j too
            while head < dq.len() && xj - points[dq[head]][0] as i64 > k {
                head += 1;
            }
            if head < dq.len() {
                let (xi, yi) = (points[dq[head]][0] as i64, points[dq[head]][1] as i64);
                let value = yj + yi + xj - xi;
                if value > best {
                    best = value;
                }
            }
            // a back entry with key <= newcomer's can never win a future j;
            // popping ties is safe — the newer index has larger x, so it
            // stays inside the k-window at least as long
            while head < dq.len() {
                let t = *dq.last().unwrap();
                if points[t][1] as i64 - points[t][0] as i64 <= yj - xj {
                    dq.pop();
                } else {
                    break;
                }
            }
            dq.push(j);
        }
        best as i32
    }
}
