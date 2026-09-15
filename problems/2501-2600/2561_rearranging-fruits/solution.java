import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public long minCost(int[] basket1, int[] basket2) {
        // A cost can only be balanced if its combined frequency across the
        // two baskets is even; an odd count makes equality impossible no
        // matter how fruits are swapped.
        Map<Integer, Long> diff = new HashMap<>();
        for (int x : basket1) diff.merge(x, 1L, Long::sum);
        for (int x : basket2) diff.merge(x, -1L, Long::sum);
        // Every |diff| / 2 surplus copies become relocation tickets. Real
        // swaps always pair one export with one import, so among all pooled
        // tickets only the cheapest half genuinely travels far. A ticket
        // costing more than twice the global minimum m is never paid
        // directly: shuttle m out and back around it and the same unit of
        // imbalance clears for a flat 2*m. At most n tickets pay at most
        // n * 2 * 10^9 <= 2*10^14, long-safe.
        List<Long> tickets = new ArrayList<>();
        for (Map.Entry<Integer, Long> entry : diff.entrySet()) {
            long delta = entry.getValue();
            if (delta % 2 != 0) return -1L;
            long copies = Math.abs(delta) / 2;
            for (long k = 0; k < copies; ++k) {
                tickets.add((long) entry.getKey());
            }
        }
        long smallest = Integer.MAX_VALUE;
        for (int x : basket1) smallest = Math.min(smallest, x);
        for (int x : basket2) smallest = Math.min(smallest, x);
        Collections.sort(tickets);
        long answer = 0;
        int half = tickets.size() / 2;
        for (int i = 0; i < half; ++i) {
            answer += Math.min(tickets.get(i), 2 * smallest);
        }
        return answer;
    }
}
