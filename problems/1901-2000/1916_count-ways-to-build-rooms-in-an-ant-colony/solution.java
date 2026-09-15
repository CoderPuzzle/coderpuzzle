import java.util.ArrayList;
import java.util.List;

class Solution {

    public int waysToBuildRooms(int[] prevRoom) {
        final long MOD = 1_000_000_007L;
        int n = prevRoom.length;
        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < n; i++) children.add(new ArrayList<>());
        for (int i = 1; i < n; i++) children.get(prevRoom[i]).add(i);

        long[] fact = new long[n + 1];
        long[] invfact = new long[n + 1];
        fact[0] = 1;
        for (int i = 1; i <= n; i++) fact[i] = (fact[i - 1] * i) % MOD;
        // Division becomes multiplication: one Fermat exponentiation inverts
        // fact[n], then invfact[i-1] = invfact[i]*i fills the table backwards —
        // avoiding one modpow per node.
        invfact[n] = modpow(fact[n], MOD - 2, MOD);
        for (int i = n; i >= 1; i--) invfact[i - 1] = (invfact[i] * i) % MOD;

        // Recursion is off the table (n up to 1e5): stack-driven preorder puts
        // parents before descendants, so the reverse walk is a post-order.
        int[] order = new int[n];
        int orderLen = 0;
        int[] stack = new int[n];
        int sp = 0;
        stack[sp++] = 0;
        while (sp > 0) {
            int u = stack[--sp];
            order[orderLen++] = u;
            for (int v : children.get(u)) stack[sp++] = v;
        }

        int[] size = new int[n];
        long[] ways = new long[n];
        java.util.Arrays.fill(size, 1);
        java.util.Arrays.fill(ways, 1L);
        // Bottom-up: ways[u] = (size(u)-1)! * prod(ways[v] / size[v]!) — build u
        // first, then multinomial-interleave the children's already-valid orders.
        for (int oi = orderLen - 1; oi >= 0; oi--) {
            int u = order[oi];
            int total = 0;
            long w = 1;
            for (int v : children.get(u)) {
                total += size[v];
                w = (w * invfact[size[v]]) % MOD;
                w = (w * ways[v]) % MOD;
            }
            size[u] = total + 1;
            ways[u] = (fact[total] * w) % MOD;
        }
        return (int) ways[0];
    }

    private static long modpow(long base, long exp, long mod) {
        long result = 1;
        base %= mod;
        while (exp > 0) {
            if ((exp & 1) == 1) result = (result * base) % mod;
            base = (base * base) % mod;
            exp >>= 1;
        }
        return result;
    }
}
