import java.util.*;

class Solution {

    public int maxScore(int[] a, int M) {
        int N = M;
        for (int x : a) N = Math.max(N, x);
        int[] f = new int[N + 1],
            d = new int[N + 1],
            sp = new int[N + 1];
        for (int x : a) f[x]++;
        for (int z = 1; z <= N; z++) for (int x = z; x <= N; x += z) d[z] += f[x];
        for (int i = 0; i <= N; i++) sp[i] = i;
        for (int p = 2; p * p <= N; p++) if (sp[p] == p) for (int x = p * p; x <= N; x += p) if (sp[x] == x) sp[x] = p;
        int ans = Integer.MIN_VALUE;
        for (int x = 1; x <= N; x++) {
            if (f[x] == 0 && x > M) continue;
            int[] ps = new int[8];
            int pc = 0,
                v = x;
            while (v > 1) {
                int p = sp[v];
                ps[pc++] = p;
                while (v % p == 0) v /= p;
            }
            int bad = 0;
            for (int mask = 1; mask < 1 << pc; mask++) {
                int q = 1,
                    b = 0;
                for (int i = 0; i < pc; i++) if (((mask >> i) & 1) > 0) {
                    q *= ps[i];
                    b++;
                }
                bad += (b % 2 == 1 ? 1 : -1) * d[q];
            }
            int cost = f[x] > 0 ? bad - (x > 1 ? 1 : 0) : Math.max(1, bad);
            ans = Math.max(ans, x - cost);
        }
        return ans;
    }
}
