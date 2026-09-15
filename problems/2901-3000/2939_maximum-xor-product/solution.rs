impl Solution {
    // Decide x's bits from the top down. Bits at or above n are beyond
    // x's reach and stay as they are. Below bit n: when a and b agree on
    // a bit, x can set it in both a^x and b^x — always a win at that
    // height. When they differ, exactly one of a^x and b^x can carry the
    // bit, and giving it to the currently smaller value dominates: it
    // adds bit*(other) to the product instead of bit*(smaller). ax and
    // bx stay below 2^50; the two mod factors stay below 2^30, so their
    // 64-bit product never overflows.
    pub fn maximum_xor_product(a: i64, b: i64, n: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut ax: i64 = 0;
        let mut bx: i64 = 0;
        for i in (0..50).rev() {
            let bit = 1i64 << i;
            if i >= n {
                if a & bit != 0 {
                    ax |= bit;
                }
                if b & bit != 0 {
                    bx |= bit;
                }
            } else if (a >> i) & 1 == (b >> i) & 1 {
                ax |= bit;
                bx |= bit;
            } else if ax <= bx {
                ax |= bit;
            } else {
                bx |= bit;
            }
        }
        (ax % MOD * (bx % MOD) % MOD) as i32
    }
}
