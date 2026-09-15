import java.util.Arrays;

class Solution {

    public int maxDifference(String s, int k) {
        int n = s.length();
        long best = Long.MIN_VALUE;
        int[] diff = new int[n + 1];
        int[] pa = new int[n + 1];
        int[] pb = new int[n + 1];
        int[] lastBAt = new int[n + 1];
        for (int a = 0; a < 5; a++) {
            for (int b = 0; b < 5; b++) {
                if (a == b) {
                    continue;
                }
                int lastB = -1;
                for (int i = 0; i < n; i++) {
                    int d = s.charAt(i) - '0';
                    diff[i + 1] = diff[i];
                    pa[i + 1] = pa[i];
                    pb[i + 1] = pb[i];
                    if (d == a) {
                        diff[i + 1] += 1;
                        pa[i + 1] ^= 1;
                    } else if (d == b) {
                        diff[i + 1] -= 1;
                        pb[i + 1] ^= 1;
                        lastB = i;
                    }
                    lastBAt[i + 1] = lastB;
                }
                long INF = Long.MAX_VALUE;
                long[][] minVal = { { INF, INF }, { INF, INF } };
                int prevBound = -1;
                for (int r = 1; r <= n; r++) {
                    int lb = lastBAt[r];
                    int bound = lb == -1 ? -1 : Math.min(r - k, lb);
                    if (bound >= 0) {
                        for (int l = prevBound + 1; l <= bound; l++) {
                            int v = diff[l];
                            if (v < minVal[pa[l]][pb[l]]) {
                                minVal[pa[l]][pb[l]] = v;
                            }
                        }
                        prevBound = bound;
                        long mv = minVal[pa[r] ^ 1][pb[r]];
                        if (mv != INF) {
                            long cand = diff[r] - mv;
                            if (cand > best) {
                                best = cand;
                            }
                        }
                    }
                }
            }
        }
        return (int) best;
    }
}
