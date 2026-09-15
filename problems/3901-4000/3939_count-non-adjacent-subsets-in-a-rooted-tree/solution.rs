impl Solution {
    pub fn count_valid_subsets(parent: Vec<i32>, nums: Vec<i32>, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let k = k as usize;
        let n = parent.len();
        let mut children = vec![Vec::new(); n];
        for i in 1..n {
            children[parent[i] as usize].push(i);
        }

        let mut dp0 = vec![vec![0i64; k]; n];
        let mut dp1 = vec![vec![0i64; k]; n];
        for node in (0..n).rev() {
            dp0[node][0] = 1;
            dp1[node][nums[node] as usize % k] = 1;
            for &child in &children[node] {
                let mut merged0 = vec![0i64; k];
                let mut merged1 = vec![0i64; k];
                for r0 in 0..k {
                    let value0 = dp0[node][r0];
                    let value1 = dp1[node][r0];
                    if value0 == 0 && value1 == 0 {
                        continue;
                    }
                    for r1 in 0..k {
                        let child_any = (dp0[child][r1] + dp1[child][r1]) % MOD;
                        let residue = (r0 + r1) % k;
                        merged0[residue] = (merged0[residue] + value0 * child_any) % MOD;
                        merged1[residue] = (merged1[residue] + value1 * dp0[child][r1]) % MOD;
                    }
                }
                dp0[node] = merged0;
                dp1[node] = merged1;
            }
        }
        ((dp0[0][0] + dp1[0][0] - 1 + MOD) % MOD) as i32
    }
}
