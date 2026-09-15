impl Solution {
    pub fn query_conversions(conversions: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        const MOD: i64 = 1_000_000_007;
        let n = conversions.len() + 1;
        // The edges form a tree rooted at unit 0. from_root[u] is the number
        // of units of type u equivalent to one unit of type 0: the residue
        // of the product of factors along the path from the root. Residues
        // stay below 2^30, but products reach 2^60, so widen to i64.
        let mut children: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n];
        for edge in &conversions {
            children[edge[0] as usize].push((edge[1] as usize, edge[2] as i64));
        }
        let mut from_root = vec![1_i64; n];
        let mut stack = Vec::with_capacity(n);
        stack.push(0_usize);
        while let Some(unit) = stack.pop() {
            for &(child, factor) in &children[unit] {
                from_root[child] = from_root[unit] * factor % MOD;
                stack.push(child);
            }
        }
        // 1 unit of type a equals from_root[b] / from_root[a] units of type
        // b. Every factor is < MOD, so no residue is 0 and the Fermat
        // inverse always exists.
        queries
            .iter()
            .map(|query| {
                let a = from_root[query[0] as usize];
                let b = from_root[query[1] as usize];
                (b * power(a, MOD - 2, MOD) % MOD) as i32
            })
            .collect()
    }
}

fn power(value: i64, exponent: i64, modulus: i64) -> i64 {
    let mut result = 1_i64;
    let mut value = value;
    let mut exponent = exponent;
    while exponent > 0 {
        if exponent & 1 == 1 {
            result = result * value % modulus;
        }
        value = value * value % modulus;
        exponent >>= 1;
    }
    result
}
