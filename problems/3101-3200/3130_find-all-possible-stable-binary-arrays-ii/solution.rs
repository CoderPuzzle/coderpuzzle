impl Solution {
    pub fn number_of_stable_arrays(zero: i32, one: i32, limit: i32) -> i64 {
        // Bottom-up block DP: dp[z][o][d] counts stable arrays ending with
        // digit d; appending a block of the opposite digit sums the trailing
        // `limit` cells along one axis. Residues stay under 2^31 and window
        // totals under 1000 * MOD < 2^50, exact in i64 arithmetic.
        const MOD: i64 = 1_000_000_007;
        let zero = zero as usize;
        let one = one as usize;
        let limit = limit as usize;
        let w = one + 1;
        let mut vert = vec![0i64; w];
        let mut prev_ones = vec![0i64; w];
        let mut history: Vec<Vec<i64>> = vec![Vec::new(); zero];
        let mut answer = 0i64;
        for z in 0..=zero {
            for o in 0..w {
                vert[o] += prev_ones[o];
            }
            if z >= limit + 1 {
                let gone = &history[z - 1 - limit];
                for o in 0..w {
                    vert[o] -= gone[o];
                }
            }
            let mut cur_zeros = vec![0i64; w];
            cur_zeros[0] = if z >= 1 && z <= limit { 1 } else { 0 };
            let mut cur_ones = vec![0i64; w];
            // Circular ring buffer over this row's zero cells, seeded with
            // the column-0 base cell so windows reach down to index 0.
            let mut ring = vec![0i64; limit];
            let (mut head, mut tail) = (1 % limit, 0usize);
            let mut count = 1usize;
            let mut ring_sum = cur_zeros[0];
            ring[0] = cur_zeros[0];
            for o in 1..=one {
                cur_zeros[o] = vert[o] % MOD;
                cur_ones[o] = ring_sum % MOD;
                if count == limit {
                    ring_sum -= ring[tail];
                    tail += 1;
                    if tail == limit {
                        tail = 0;
                    }
                    count -= 1;
                }
                ring[head] = cur_zeros[o];
                head += 1;
                if head == limit {
                    head = 0;
                }
                count += 1;
                ring_sum += cur_zeros[o];
            }
            if z == 0 {
                // Row z == 0 holds the all-ones prefixes themselves.
                for o in 1..=one {
                    cur_ones[o] = if o <= limit { 1 } else { 0 };
                }
            }
            answer = (cur_zeros[one] + cur_ones[one]) % MOD;
            if z < zero {
                history[z] = cur_ones.clone();
            }
            prev_ones = cur_ones;
        }
        answer
    }
}
