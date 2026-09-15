import java.util.*;

class Solution {

    static class B {

        int n;
        int[] c;
        long[] s;

        B(int n) {
            this.n = n;
            c = new int[n + 1];
            s = new long[n + 1];
        }

        void add(int p, int x, long y) {
            for (p++; p <= n; p += p & -p) {
                c[p] += x;
                s[p] += y;
            }
        }

        long[] pref(int p) {
            long x = 0,
                y = 0;
            for (; p > 0; p -= p & -p) {
                x += c[p];
                y += s[p];
            }
            return new long[] { x, y };
        }

        int kth(int k) {
            int p = 0;
            for (int z = Integer.highestOneBit(n); z > 0; z >>= 1) if (p + z <= n && c[p + z] < k) {
                k -= c[p + z];
                p += z;
            }
            return p;
        }

        long small(int k, int[] v) {
            if (k == 0) return 0;
            int p = kth(k);
            long[] q = pref(p);
            return q[1] + (k - q[0]) * v[p];
        }
    }

    public long maxSum(int[] a, int k) {
        int n = a.length;
        int[] v = a.clone();
        Arrays.sort(v);
        int z = 0;
        for (int x : v) if (z == 0 || v[z - 1] != x) v[z++] = x;
        v = Arrays.copyOf(v, z);
        int[] p = new int[n];
        for (int i = 0; i < n; i++) p[i] = Arrays.binarySearch(v, a[i]);
        long best = Long.MIN_VALUE;
        for (int l = 0; l < n; l++) {
            B in = new B(z),
                out = new B(z);
            for (int i = 0; i < n; i++) out.add(p[i], 1, a[i]);
            long sum = 0;
            for (int r = l; r < n; r++) {
                out.add(p[r], -1, -a[r]);
                in.add(p[r], 1, a[r]);
                sum += a[r];
                int oc = n - (r - l + 1),
                    lo = 0,
                    hi = Math.min(k, Math.min(r - l + 1, oc));
                while (lo < hi) {
                    int t = (lo + hi + 1) / 2;
                    if (v[out.kth(oc - t + 1)] > v[in.kth(t)]) lo = t;
                    else hi = t - 1;
                }
                long gain = out.small(oc, v) - out.small(oc - lo, v) - in.small(lo, v);
                best = Math.max(best, sum + gain);
            }
        }
        return best;
    }
}
