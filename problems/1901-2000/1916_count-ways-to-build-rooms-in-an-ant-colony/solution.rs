impl Solution {
    pub fn ways_to_build_rooms(prev_room: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = prev_room.len();
        let mut children: Vec<Vec<usize>> = vec![Vec::new(); n];
        for i in 1..n {
            children[prev_room[i] as usize].push(i);
        }

        let mut fact = vec![1i64; n + 1];
        for i in 1..=n {
            fact[i] = fact[i - 1] * i as i64 % MOD;
        }
        // Division becomes multiplication: one Fermat exponentiation inverts
        // fact[n], then invfact[i-1] = invfact[i]*i fills the table backwards —
        // avoiding one modpow per node.
        let mut invfact = vec![1i64; n + 1];
        invfact[n] = modpow(fact[n], MOD - 2, MOD);
        for i in (1..=n).rev() {
            invfact[i - 1] = invfact[i] * i as i64 % MOD;
        }

        // Recursion is off the table (n up to 1e5): stack-driven preorder puts
        // parents before descendants, so the reverse walk is a post-order.
        let mut order: Vec<usize> = Vec::with_capacity(n);
        let mut stack: Vec<usize> = vec![0];
        while let Some(u) = stack.pop() {
            order.push(u);
            stack.extend_from_slice(&children[u]);
        }

        let mut size = vec![1usize; n];
        let mut ways = vec![1i64; n];
        // Bottom-up: ways[u] = (size(u)-1)! * prod(ways[v] / size[v]!) — build u
        // first, then multinomial-interleave the children's already-valid orders.
        for &u in order.iter().rev() {
            let mut total = 0usize;
            let mut w = 1i64;
            for &v in &children[u] {
                total += size[v];
                w = w * invfact[size[v]] % MOD;
                w = w * ways[v] % MOD;
            }
            size[u] = total + 1;
            ways[u] = fact[total] * w % MOD;
        }
        ways[0] as i32
    }
}

fn modpow(mut base: i64, mut exp: i64, m: i64) -> i64 {
    let mut result = 1i64;
    base %= m;
    while exp > 0 {
        if exp & 1 == 1 {
            result = result * base % m;
        }
        base = base * base % m;
        exp >>= 1;
    }
    result
}
