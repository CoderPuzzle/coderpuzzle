import java.util.HashMap;
import java.util.Map;

class Solution {

    public int minArrivalsToDiscard(int[] arrivals, int w, int m) {
        // cnt holds how many kept arrivals of each type sit inside the
        // current w-day window; kept[i] records whether day i was kept, since
        // a discarded arrival never entered the counts and must not be
        // decremented when its day slides out of the window.
        Map<Integer, Integer> cnt = new HashMap<>();
        boolean[] kept = new boolean[arrivals.length];
        int discards = 0;
        for (int i = 0; i < arrivals.length; i++) {
            if (i >= w && kept[i - w]) {
                cnt.merge(arrivals[i - w], -1, Integer::sum);
            }
            int count = cnt.getOrDefault(arrivals[i], 0);
            if (count == m) {
                discards++;
            } else {
                kept[i] = true;
                cnt.put(arrivals[i], count + 1);
            }
        }
        return discards;
    }
}
