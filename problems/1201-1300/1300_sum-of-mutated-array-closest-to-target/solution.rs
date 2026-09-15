impl Solution {
    pub fn find_best_value(arr: Vec<i32>, target: i32) -> i32 {
        let sum_min = |value: i64| -> i64 {
            let mut sum = 0i64;
            for &x in &arr {
                sum += (x as i64).min(value);
            }
            sum
        };
        let mut hi = arr.iter().copied().max().unwrap() as i64;
        let mut lo = 0i64;
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if sum_min(mid) >= target as i64 {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        if (sum_min(lo - 1) - target as i64).abs() <= (sum_min(lo) - target as i64).abs() {
            (lo - 1) as i32
        } else {
            lo as i32
        }
    }
}
