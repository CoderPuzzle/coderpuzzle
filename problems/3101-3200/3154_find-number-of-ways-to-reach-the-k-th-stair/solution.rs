impl Solution {
    pub fn ways_to_reach_stair(k: i32) -> i64 {
        // With x up-ops the top height is 2^x, so ending on stair k takes
        // y = 2^x - k down-ops; they must sit in distinct gaps among the
        // x + 1 slots around the ups, giving C(x + 1, y) orderings. The
        // x + 1 <= 31 shift keeps every intermediate inside i32.
        let mut total: i64 = 0;
        let mut ups: u32 = 0;
        loop {
            let downs = (1i32 << ups) - k;
            if downs > ups as i32 + 1 {
                break;
            }
            if downs >= 0 {
                let mut ways: i64 = 1;
                for i in 0..downs {
                    ways = ways * ((ups as i32 + 1 - i) as i64) / ((i + 1) as i64);
                }
                total += ways;
            }
            ups += 1;
        }
        total
    }
}
