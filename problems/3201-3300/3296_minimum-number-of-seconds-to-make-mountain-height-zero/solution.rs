impl Solution {
    pub fn min_number_of_seconds(mountain_height: i32, worker_times: Vec<i32>) -> i64 {
        let mut max_w: i64 = 0;
        for &wt in &worker_times {
            max_w = max_w.max(wt as i64);
        }
        let h = mountain_height as i64;
        let mut hi: i64 = max_w * h * (h + 1) / 2;
        let mut lo: i64 = 0;
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            let mut total: i64 = 0;
            for &wt in &worker_times {
                total += units(wt as i64, mid);
                if total >= h {
                    break;
                }
            }
            if total >= h {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }
}

// largest x such that wt * x*(x+1)/2 <= t
fn units(wt: i64, t: i64) -> i64 {
    let c = (2 * t) / wt;
    let v = 1 + 4 * c;
    let mut r = (v as f64).sqrt() as i64;
    if r < 0 {
        r = 0;
    }
    while r * r > v {
        r -= 1;
    }
    while (r + 1) * (r + 1) <= v {
        r += 1;
    }
    (r - 1) / 2
}
