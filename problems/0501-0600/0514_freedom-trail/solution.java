import java.util.*;

class Solution {

    public int findRotateSteps(String ring, String key) {
        int n = ring.length();
        // Precompute each character's indices so every stage only considers
        // alignments that actually spell the current key character (never
        // empty because the key is guaranteed spellable).
        List<List<Integer>> positions = new ArrayList<>();
        for (int i = 0; i < 26; i++) positions.add(new ArrayList<>());
        for (int i = 0; i < n; i++) positions.get(ring.charAt(i) - 'a').add(i);
        // dp: ring index aligned at 12:00 -> min rotation steps so far
        Map<Integer, Integer> dp = new HashMap<>();
        dp.put(0, 0);
        for (int t = 0; t < key.length(); t++) {
            List<Integer> list = positions.get(key.charAt(t) - 'a');
            Map<Integer, Integer> nxt = new HashMap<>();
            for (int j : list) {
                int best = Integer.MAX_VALUE;
                for (Map.Entry<Integer, Integer> e : dp.entrySet()) {
                    int i = e.getKey();
                    // Circular rotation cost between alignments i and j:
                    // the shorter of the direct and wrap-around distances.
                    int diff = Math.abs(i - j);
                    int rot = Math.min(diff, n - diff);
                    best = Math.min(best, e.getValue() + rot);
                }
                nxt.put(j, best);
            }
            dp = nxt;
        }
        // Cheapest final alignment, plus one button press per key char.
        int ans = Integer.MAX_VALUE;
        for (int v : dp.values()) ans = Math.min(ans, v);
        return ans + key.length();
    }
}
