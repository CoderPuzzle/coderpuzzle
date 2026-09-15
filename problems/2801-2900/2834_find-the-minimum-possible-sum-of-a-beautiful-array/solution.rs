const MOD: i64 = 1_000_000_007;

impl Solution {
    pub fn minimum_possible_sum(n: i32, target: i32) -> i32 {
        let n = n as i64;
        let target = target as i64;

        // Cheaply available prefix 1..k: its two largest distinct values sum
        // to k + (k - 1) <= target - 1 < target, so it never self-conflicts.
        // Every value in (k, target) pairs with an already-taken small number,
        // so the greedy jumps straight past target for the remaining m slots;
        // values >= target only pair with non-positive complements or larger
        // values, so the tail target..target+m-1 is also conflict-free.
        let k = n.min(target / 2);
        let m = n - k;

        // Exact worst case ~7.5e17, far below the i64 ceiling; one modulo at
        // the very end leaves the residue the wire wants.
        let total = k * (k + 1) / 2 + m * target + m * (m - 1) / 2;
        (total % MOD) as i32
    }
}
