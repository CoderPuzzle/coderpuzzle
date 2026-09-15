impl Solution {
    pub fn least_ops_express_target(x: i32, target: i32) -> i32 {
        // Between the additions and subtractions, every maximal run of
        // multiplications and divisions collapses to one power of x, so the
        // expression is a signed sum of powers. A copy of x^i (i >= 1) costs
        // i - 1 operators to build plus one to attach, and a copy of 1 = x/x
        // costs the division plus the attach — so a copy is charged 2
        // operators at the units place and i operators at the i-th place.
        // Reading target in base x, each digit d is paid either d copies at
        // its own place or x - d copies subtracted with one unit carried
        // into the next place up. Sweeping digits from the least significant
        // end with the two carry states 0/1, and charging one top unit for a
        // carry that survives past the top digit, minimizes the operator
        // total; the very first copy needs no attaching operator, so one is
        // deducted at the end. The sentinel marking the carry state
        // unreachable before the first digit keeps the two totals in i64.
        let (mut cost0, mut cost1) = (0i64, 1i64 << 60);
        let mut i: i64 = 0;
        let mut t = target as i64;
        while t > 0 {
            let p: i64 = if i == 0 { 2 } else { i };
            let r = t % x as i64;
            t /= x as i64;
            let x = x as i64;
            let n0 = (cost0 + r * p).min(cost1 + (r + 1) * p);
            let n1 = (cost0 + (x - r) * p).min(cost1 + (x - r - 1) * p);
            cost0 = n0;
            cost1 = n1;
            i += 1;
        }
        (cost0.min(cost1 + i) - 1) as i32
    }
}
