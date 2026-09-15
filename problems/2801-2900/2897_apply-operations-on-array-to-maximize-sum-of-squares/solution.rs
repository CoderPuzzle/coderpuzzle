impl Solution {
    pub fn max_sum(nums: Vec<i32>, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;

        // The operation replaces a pair with (a AND b, a OR b): the AND
        // keeps exactly the bits both values shared and the OR keeps
        // exactly the bits either had, so every bit position owns a fixed
        // pool of count[b] copies that operations merely reshuffle across
        // the array.
        let mut count = [0i64; 30];
        for x in &nums {
            for b in 0..30 {
                if (x >> b) & 1 == 1 {
                    count[b] += 1;
                }
            }
        }

        // Pour the pools into the k kept slots greedily, highest bit first:
        // a set bit raises a larger running value's square by more, so the
        // biggest slots take every bit first. Slot i then holds bit b
        // exactly when i sits below count[b], so one sweep from the OR of
        // all present bits - dropping bit b as the sweep passes index
        // count[b] - walks the final slot values directly.
        let k = k as usize;
        let mut drop = vec![0i32; k];
        let mut value: i32 = 0;
        for b in 0..30 {
            if count[b] > 0 {
                value |= 1 << b;
                if (count[b] as usize) < k {
                    drop[count[b] as usize] |= 1 << b;
                }
            }
        }

        let mut total: i64 = 0;
        for i in 0..k {
            if i > 0 {
                value ^= drop[i];
            }
            // Slots stay below 2^30 but their squares reach ~1.15e18, so
            // the 64-bit product is reduced modulo 10^9 + 7 as the total
            // accumulates.
            total = (total + (value as i64) * (value as i64)) % MOD;
        }
        total as i32
    }
}
