// Appending the L-bit binary form of i to a value v computes
// v * 2^L + i, so a running residue carries the whole concatenation
// without ever materializing it — at n = 10^5 the string already
// spans 1,568,946 bits. L is i's bit length: it starts at 1 and
// increments exactly when i is a power of two, (i & (i - 1)) == 0,
// because only a newly set highest bit widens the run. The residue
// stays below 2^30 and L at or below 17, so result * 2^L + i stays
// below 2^48 — safely inside the i64 registers used here.
impl Solution {
    pub fn concatenated_binary(n: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut result: i64 = 0;
        let mut length: i32 = 0;
        for i in 1..=n {
            if (i & (i - 1)) == 0 {
                length += 1;
            }
            let shift: i64 = 1 << length;
            result = (result * shift + i64::from(i)) % MOD;
        }
        result as i32
    }
}
