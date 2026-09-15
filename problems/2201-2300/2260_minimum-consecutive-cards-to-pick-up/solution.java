import java.util.HashMap;
import java.util.Map;

class Solution {

    public int minimumCardPickup(int[] cards) {
        Map<Integer, Integer> last = new HashMap<>();
        int best = Integer.MAX_VALUE;
        for (int i = 0; i < cards.length; i++) {
            Integer prev = last.get(cards[i]);
            if (prev != null && i - prev + 1 < best) {
                best = i - prev + 1;
            }
            last.put(cards[i], i);
        }
        return best == Integer.MAX_VALUE ? -1 : best;
    }
}
