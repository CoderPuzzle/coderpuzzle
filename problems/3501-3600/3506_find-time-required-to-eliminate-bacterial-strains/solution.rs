impl Solution {
    // The splitting process is a full binary tree: a leaf at depth d is a
    // WBC that starts working at d * splitTime. Deadline T is reachable
    // iff strain i can sit on a leaf of depth d <= (T - timeReq[i]) /
    // splitTime, and legal leaf-depth multisets are exactly the
    // Kraft-legal ones (sum 2^-d <= 1) -- minimized by taking every strain
    // at its full depth bound. Binary search the minimal T. Deadlines
    // reach ~1e14, so all bounds arithmetic is i64.
    pub fn min_elimination_time(time_req: Vec<i32>, split_time: i32) -> i64 {
        let n = time_req.len();
        let mx = *time_req.iter().max().unwrap();
        let split_time = split_time as i64;
        let mut lo = mx as i64 + split_time;
        let mut hi = mx as i64 + (n as i64 - 1) * split_time;
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            let mut slots: i64 = 0;
            let mut deep = 0;
            let mut ok = true;
            for t in &time_req {
                let d = (mid - *t as i64) / split_time;
                if d < 1 {
                    ok = false;
                    break;
                }
                if d > 30 {
                    // bounds past depth 30 fit together in less than one
                    // 2^-30 unit of slack (n < 2^17 strains), so count all
                    // of them as a single unit
                    deep = 1;
                } else {
                    slots += 1i64 << (30 - d);
                    if slots > 1i64 << 30 {
                        ok = false;
                        break;
                    }
                }
            }
            if ok && slots + deep <= 1i64 << 30 {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }
}
