function waysToBuildRooms(prevRoom: number[]): number {
    const MOD = 1000000007n;
    const n = prevRoom.length;
    const children: number[][] = new Array(n);
    for (let i0 = 0; i0 < n; i0++) children[i0] = [];
    for (let i = 1; i < n; i++) children[prevRoom[i]].push(i);

    const fact: bigint[] = new Array(n + 1);
    const invfact: bigint[] = new Array(n + 1);
    fact[0] = 1n;
    for (let f = 1; f <= n; f++) fact[f] = (fact[f - 1] * BigInt(f)) % MOD;
    // Division becomes multiplication: one Fermat exponentiation inverts
    // fact[n], then invfact[i-1] = invfact[i]*i fills the table backwards —
    // avoiding one modpow per node.
    invfact[n] = modpow(fact[n], MOD - 2n, MOD);
    for (let g = n; g >= 1; g--) invfact[g - 1] = (invfact[g] * BigInt(g)) % MOD;

    // Recursion is off the table (n up to 1e5): stack-driven preorder puts
    // parents before descendants, so the reverse walk is a post-order.
    const order: number[] = [];
    const stack: number[] = [0];
    while (stack.length > 0) {
        const u = stack.pop()!;
        order.push(u);
        for (const c of children[u]) stack.push(c);
    }

    const size: number[] = new Array(n).fill(1);
    const ways: bigint[] = new Array(n).fill(1n);
    // Bottom-up: ways[u] = (size(u)-1)! * prod(ways[v] / size[v]!) — build u
    // first, then multinomial-interleave the children's already-valid orders.
    for (let oi = order.length - 1; oi >= 0; oi--) {
        const u = order[oi];
        let total = 0;
        let w = 1n;
        for (const v of children[u]) {
            total += size[v];
            w = (w * invfact[size[v]]) % MOD;
            w = (w * ways[v]) % MOD;
        }
        size[u] = total + 1;
        ways[u] = (fact[total] * w) % MOD;
    }
    return Number(ways[0]);
}

function modpow(base: bigint, exp: bigint, mod: bigint): bigint {
    let result = 1n;
    base %= mod;
    while (exp > 0n) {
        if (exp & 1n) result = (result * base) % mod;
        base = (base * base) % mod;
        exp >>= 1n;
    }
    return result;
}
