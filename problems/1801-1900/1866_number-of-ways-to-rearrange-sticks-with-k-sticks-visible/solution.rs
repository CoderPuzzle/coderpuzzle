impl Solution {
    pub fn rearrange_sticks(n: i32, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = n as usize;
        let k = k as usize;
        // cur[j] = f(i, j): i sticks, j visible
        let mut cur = vec![0i64; k + 1];
        cur[0] = 1; // f(0, 0)
        for i in 1..=n {
            let mut nxt = vec![0i64; k + 1];
            for j in 1..=k {
                nxt[j] = (cur[j - 1] + (i as i64 - 1) * cur[j]) % MOD;
            }
            cur = nxt;
        }
        cur[k] as i32
    }
}
