impl Solution {
    pub fn total_strength(strength: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = strength.len();

        // prev[i]: index of nearest strictly-smaller element to the left, else -1.
        let mut prev = vec![-1i64; n];
        let mut stack: Vec<usize> = Vec::with_capacity(n);
        for i in 0..n {
            while let Some(&t) = stack.last() {
                if strength[t] >= strength[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            prev[i] = stack.last().map(|&t| t as i64).unwrap_or(-1);
            stack.push(i);
        }

        // nxt[i]: index of nearest element <= strength[i] to the right, else n.
        let mut nxt = vec![n as i64; n];
        stack.clear();
        for i in (0..n).rev() {
            while let Some(&t) = stack.last() {
                if strength[t] > strength[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            nxt[i] = stack.last().map(|&t| t as i64).unwrap_or(n as i64);
            stack.push(i);
        }

        // All prefix sums are kept reduced mod MOD; only residues are needed below.
        let mut prefix = vec![0i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = (prefix[i] + strength[i] as i64) % MOD;
        }

        // pre_prefix[k] = sum of prefix[0..k-1]
        let mut pre_prefix = vec![0i64; n + 2];
        for i in 0..=n {
            pre_prefix[i + 1] = (pre_prefix[i] + prefix[i]) % MOD;
        }

        let mut answer: i64 = 0;
        for i in 0..n {
            let left = i as i64 - prev[i];
            let right = nxt[i] - i as i64;
            let sum_left = (pre_prefix[i + 1] - pre_prefix[(prev[i] + 1) as usize] + MOD) % MOD;
            let sum_right = (pre_prefix[(nxt[i] + 1) as usize] - pre_prefix[i + 1] + MOD) % MOD;
            // Python's % is always non-negative; rem_euclid mirrors that.
            let term = (left * sum_right % MOD - right * sum_left % MOD).rem_euclid(MOD);
            let contribution = (strength[i] as i64) * term % MOD;
            answer = (answer + contribution) % MOD;
        }
        answer as i32
    }
}
