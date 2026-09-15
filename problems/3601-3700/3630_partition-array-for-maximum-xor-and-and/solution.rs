impl Solution {
    pub fn maximize_xor_and_xor(nums: Vec<i32>) -> i64 {
        // Enumerate the AND-subset B over all 2^n masks. Two subset
        // tables give AND(B) (all-ones identity, read as 0 for the empty
        // subset per the statement) and XOR(B). With s = XOR of the pool
        // (indices outside B), the best A/C split maximizes x + (s ^ x)
        // over subset XORs x of the pool, and x + (s ^ x) = s + 2 *
        // (x & ~s), so a linear basis over the pool values masked with
        // ~s answers it greedily from the top bit. The bound and(B) + s
        // + 2 * (~s & MASK) prunes most subsets once the incumbent is
        // strong. Sums reach ~3.2e9, so i64 accumulation is required.
        let n = nums.len();
        let size = 1usize << n;
        let full: i32 = (1i32 << 30) - 1;
        let mut and_dp = vec![0i32; size];
        and_dp[0] = full; // AND identity; the empty subset reads as 0 below
        let mut xor_dp = vec![0i32; size];
        for subset in 1..size {
            let low = subset & subset.wrapping_neg();
            let j = low.trailing_zeros() as usize;
            and_dp[subset] = and_dp[subset ^ low] & nums[j];
            xor_dp[subset] = xor_dp[subset ^ low] ^ nums[j];
        }
        let mut best = 0i64;
        let mut basis = [0i32; 30];
        for b in 0..size {
            let s = xor_dp[size - 1] ^ xor_dp[b];
            let t = !s & full;
            let and_b: i64 = if b == 0 { 0 } else { and_dp[b] as i64 };
            if and_b + s as i64 + 2 * t as i64 <= best {
                continue;
            }
            let inv = !s;
            basis = [0i32; 30];
            for j in 0..n {
                if (b >> j) & 1 == 1 {
                    continue;
                }
                let mut w = nums[j] & inv;
                while w != 0 {
                    let p = 31 - w.leading_zeros() as usize;
                    let top = basis[p];
                    if top != 0 {
                        w ^= top;
                    } else {
                        basis[p] = w;
                        break;
                    }
                }
            }
            let mut x = 0i32;
            for p in (0..30).rev() {
                if basis[p] != 0 && (x >> p) & 1 == 0 {
                    x ^= basis[p];
                }
            }
            let val = and_b + s as i64 + 2 * x as i64;
            if val > best {
                best = val;
            }
        }
        best
    }
}
