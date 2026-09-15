impl Solution {
    pub fn max_possible_score(start: Vec<i32>, d: i32) -> i32 {
        let mut arr: Vec<i64> = start.iter().map(|&v| v as i64).collect();
        arr.sort_unstable();
        let n = arr.len();
        let dd = d as i64;

        let feasible = |x: i64| -> bool {
            let mut last = arr[0];
            for i in 1..n {
                let chosen = arr[i].max(last + x);
                if chosen > arr[i] + dd {
                    return false;
                }
                last = chosen;
            }
            true
        };

        let mut lo: i64 = 0;
        let mut hi: i64 = arr[n - 1] + dd - arr[0] + 1; // hi is infeasible
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if feasible(mid) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        (lo - 1) as i32
    }
}
