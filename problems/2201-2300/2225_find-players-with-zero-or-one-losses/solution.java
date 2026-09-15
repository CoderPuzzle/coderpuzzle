import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public List<List<Integer>> findWinners(int[][] matches) {
        Map<Integer, Integer> losses = new HashMap<>();
        for (int[] match : matches) {
            losses.putIfAbsent(match[0], 0);
            losses.merge(match[1], 1, Integer::sum);
        }
        List<Integer> neverLost = new ArrayList<>();
        List<Integer> lostOnce = new ArrayList<>();
        for (Map.Entry<Integer, Integer> entry : losses.entrySet()) {
            int count = entry.getValue();
            if (count == 0) {
                neverLost.add(entry.getKey());
            } else if (count == 1) {
                lostOnce.add(entry.getKey());
            }
        }
        Collections.sort(neverLost);
        Collections.sort(lostOnce);
        return List.of(neverLost, lostOnce);
    }
}
