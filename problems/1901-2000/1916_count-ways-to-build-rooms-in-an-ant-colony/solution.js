/**
 * @param {number[]} prevRoom
 * @return {number}
 */
var waysToBuildRooms = function (prevRoom) {
    var MOD = 1000000007n;
    var n = prevRoom.length;
    var children = new Array(n);
    for (var i0 = 0; i0 < n; i0++) children[i0] = [];
    for (var i = 1; i < n; i++) children[prevRoom[i]].push(i);

    var fact = new Array(n + 1);
    var invfact = new Array(n + 1);
    fact[0] = 1n;
    for (var f = 1; f <= n; f++) fact[f] = (fact[f - 1] * BigInt(f)) % MOD;
    // Division becomes multiplication: one Fermat exponentiation inverts
    // fact[n], then invfact[i-1] = invfact[i]*i fills the table backwards —
    // avoiding one modpow per node.
    invfact[n] = modpow(fact[n], MOD - 2n, MOD);
    for (var g = n; g >= 1; g--) invfact[g - 1] = (invfact[g] * BigInt(g)) % MOD;

    // Recursion is off the table (n up to 1e5): stack-driven preorder puts
    // parents before descendants, so the reverse walk is a post-order.
    var order = [];
    var stack = [0];
    while (stack.length > 0) {
        var u = stack.pop();
        order.push(u);
        var cu = children[u];
        for (var k = 0; k < cu.length; k++) stack.push(cu[k]);
    }

    var size = new Array(n).fill(1);
    var ways = new Array(n).fill(1n);
    // Bottom-up: ways[u] = (size(u)-1)! * prod(ways[v] / size[v]!) — build u
    // first, then multinomial-interleave the children's already-valid orders.
    for (var oi = order.length - 1; oi >= 0; oi--) {
        var u2 = order[oi];
        var total = 0;
        var w = 1n;
        var ch = children[u2];
        for (var ci = 0; ci < ch.length; ci++) {
            var v = ch[ci];
            total += size[v];
            w = (w * invfact[size[v]]) % MOD;
            w = (w * ways[v]) % MOD;
        }
        size[u2] = total + 1;
        ways[u2] = (fact[total] * w) % MOD;
    }
    return Number(ways[0]);
};

function modpow(base, exp, mod) {
    var result = 1n;
    base %= mod;
    while (exp > 0n) {
        if (exp & 1n) result = (result * base) % mod;
        base = (base * base) % mod;
        exp >>= 1n;
    }
    return result;
}
