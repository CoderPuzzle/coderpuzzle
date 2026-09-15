import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maxSumDistinctTriplet(int[] x, int[] y) {
        // Each x-value can enter the triplet at most once, so only its best
        // y matters: keep the maximum y per distinct x in a hash map.
        Map<Integer, Integer> best = new HashMap<>();
        for (int i = 0; i < x.length; ++i) {
            best.merge(x[i], y[i], Math::max);
        }
        if (best.size() < 3) return -1;
        // The answer is the sum of the three largest per-x maxima.
        int a = 0,
            b = 0,
            c = 0;
        for (int v : best.values()) {
            if (v > a) {
                c = b;
                b = a;
                a = v;
            } else if (v > b) {
                c = b;
                b = v;
            } else if (v > c) {
                c = v;
            }
        }
        return a + b + c;
    }
}
