impl Solution {
    pub fn count_kth_roots(l: i32, r: i32, k: i32) -> i32 {
        if k == 1 {
            return r - l + 1;
        }
        fn count(bound: i64, k: i32) -> i32 {
            if bound < 0 {
                return 0;
            }
            let fits = |base: i64| -> bool {
                let mut value = 1_i64;
                for _ in 0..k {
                    if base != 0 && value > bound / base {
                        return false;
                    }
                    value *= base;
                }
                value <= bound
            };
            let mut low = 0_i64;
            let mut high = bound;
            while low < high {
                let middle = low + (high - low + 1) / 2;
                if fits(middle) {
                    low = middle;
                } else {
                    high = middle - 1;
                }
            }
            low as i32 + 1
        }
        count(r as i64, k) - count(l as i64 - 1, k)
    }
}
