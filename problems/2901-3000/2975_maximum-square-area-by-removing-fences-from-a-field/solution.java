import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

class Solution {

    private Set<Long> allGaps(long outer, long[] fences) {
        long[] xs = new long[fences.length + 2];
        System.arraycopy(fences, 0, xs, 0, fences.length);
        xs[fences.length] = 1;
        xs[fences.length + 1] = outer;
        Arrays.sort(xs);
        Set<Long> out = new HashSet<>();
        for (int i = 0; i < xs.length; i++) {
            for (int j = i + 1; j < xs.length; j++) {
                out.add(xs[j] - xs[i]);
            }
        }
        return out;
    }

    public long maximizeSquareArea(long m, long n, long[] hFences, long[] vFences) {
        // Adding the immovable border fences at 1 and outer makes every
        // surviving region width a pairwise difference of the positions.
        // The square side is the largest gap present in both directions.
        Set<Long> hGaps = allGaps(m, hFences);
        long best = -1;
        for (long d : allGaps(n, vFences)) {
            if (d > best && hGaps.contains(d)) {
                best = d;
            }
        }
        // best <= 10^9 - 1, so the square fits in 64 bits before the modulo.
        return best < 0 ? -1 : (best * best) % 1_000_000_007L;
    }
}
