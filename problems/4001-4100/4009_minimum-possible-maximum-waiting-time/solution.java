import java.util.*;

class Solution {

    public int minMaxWaitingTime(int[] demand, int[] fuel) {
        // Level sweep over cars. A state packs (fuel0, fuel1, busy0, busy1)
        // -- remaining fuel and remaining busy time per dispenser, measured
        // from when the current car becomes allowed -- in base 51, mapped
        // to the smallest maximum waiting time achievable so far.
        final int B = 51;
        Map<Integer, Integer> states = new HashMap<>();
        states.put((fuel[0] * B + fuel[1]) * B * B, 0);
        for (int i = 0; i < demand.length; i++) {
            int d = demand[i];
            Map<Integer, Integer> nxt = new HashMap<>();
            for (Map.Entry<Integer, Integer> e : states.entrySet()) {
                int key = e.getKey(),
                    worst = e.getValue();
                int f0 = key / (B * B * B);
                int f1 = (key / (B * B)) % B;
                int r0 = (key / B) % B;
                int r1 = key % B;
                if (f0 >= d) {
                    // Serve car i on dispenser 0; the other dispenser's
                    // clock runs down by r0 while it waits.
                    int nmw = Math.max(worst, r0);
                    int nk = (((f0 - d) * B + f1) * B + d) * B + Math.max(r1 - r0, 0);
                    merge(nxt, nk, nmw);
                }
                if (f1 >= d) {
                    int nmw = Math.max(worst, r1);
                    int nk = ((f0 * B + (f1 - d)) * B + Math.max(r0 - r1, 0)) * B + d;
                    merge(nxt, nk, nmw);
                }
            }
            if (nxt.isEmpty()) {
                // The process terminates here and no car may be skipped,
                // so every live state has served exactly i cars.
                if (i == 0) {
                    return -1;
                }
                return best(states);
            }
            states = nxt;
        }
        return best(states);
    }

    private void merge(Map<Integer, Integer> map, int key, int val) {
        Integer old = map.get(key);
        if (old == null || val < old) {
            map.put(key, val);
        }
    }

    private int best(Map<Integer, Integer> states) {
        int ans = Integer.MAX_VALUE;
        for (int v : states.values()) {
            ans = Math.min(ans, v);
        }
        return ans;
    }
}
