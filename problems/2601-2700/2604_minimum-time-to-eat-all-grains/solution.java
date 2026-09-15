import java.util.Arrays;

class Solution {

    public int minimumTime(int[] hens, int[] grains) {
        // Binary search the answer T, checked by a greedy sweep. With both
        // arrays sorted, hens in ascending order eating contiguous grain
        // prefixes is optimal by an exchange argument. A hen at h covering
        // grains up to g needs L + R + min(L, R) seconds, where
        // L = max(0, h - leftmost) and R = max(0, rightmost - h): whichever
        // extreme the hen reaches second becomes the double-walked detour.
        Arrays.sort(hens);
        Arrays.sort(grains);
        long lo = 0;
        long hi = 2_000_000_000L;
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2;
            if (feasible(mid, hens, grains)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int) lo;
    }

    private boolean feasible(long t, int[] hens, int[] grains) {
        int j = 0;
        for (int h : hens) {
            if (j == grains.length) {
                break;
            }
            long left = Math.max(0, h - grains[j]);
            int k = j;
            while (k < grains.length) {
                // Segment cost fits a long: left/right are at most 1e9 each,
                // so 2*left + right stays well inside 32-bit-adjacent risk.
                long right = Math.max(0, (long) grains[k] - h);
                if (Math.min(2 * left + right, left + 2 * right) > t) {
                    break;
                }
                ++k;
            }
            j = k;
        }
        return j == grains.length;
    }
}
