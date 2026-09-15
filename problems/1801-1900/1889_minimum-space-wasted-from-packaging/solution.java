import java.util.*;

class Solution {

    // Per supplier: sorted boxes assign each package its smallest fitting
    // size; waste = count*(box) - range package sum via prefix sums.
    // Skip suppliers whose largest box is too small.
    public long minWastedSpace(int[] packages, int[][] boxes) {
        int n = packages.length;
        long[] pkg = new long[n];
        for (int i = 0; i < n; i++) {
            pkg[i] = packages[i];
        }
        Arrays.sort(pkg);
        long[] pre = new long[n + 1];
        for (int i = 0; i < n; i++) {
            pre[i + 1] = pre[i] + pkg[i];
        }
        long best = -1;
        for (int[] supplier : boxes) {
            int[] s = supplier.clone();
            Arrays.sort(s);
            if (s[s.length - 1] < pkg[n - 1]) {
                continue;
            }
            long waste = 0;
            int prev = 0;
            for (int b : s) {
                int cnt = upperBound(pkg, b);
                if (cnt > prev) {
                    waste += (long) (cnt - prev) * b - (pre[cnt] - pre[prev]);
                    prev = cnt;
                }
                if (prev == n) {
                    break;
                }
            }
            if (best < 0 || waste < best) {
                best = waste;
            }
        }
        return best < 0 ? -1 : best % 1000000007L;
    }

    private int upperBound(long[] a, long key) {
        int lo = 0,
            hi = a.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (a[mid] <= key) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
