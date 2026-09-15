import java.util.*;

class Solution {

    public int maxStudents(String[][] seats) {
        int m = seats.length;
        int n = seats[0].length;

        List<List<Integer>> rowMasks = new ArrayList<>();
        for (String[] row : seats) {
            List<Integer> masks = new ArrayList<>();
            for (int mask = 0; mask < 1 << n; mask++) {
                boolean ok = true;
                for (int c = 0; c < n; c++) {
                    if (((mask >> c) & 1) == 1) {
                        if (row[c].equals("#")) {
                            ok = false;
                            break;
                        }
                        if (c > 0 && ((mask >> (c - 1)) & 1) == 1) {
                            ok = false;
                            break;
                        }
                    }
                }
                if (ok) masks.add(mask);
            }
            rowMasks.add(masks);
        }

        // dp over rows: states maps previous row's mask -> best count so far.
        Map<Integer, Integer> states = new HashMap<>();
        states.put(0, 0);
        for (int i = 0; i < m; i++) {
            Map<Integer, Integer> newStates = new HashMap<>();
            for (int mask : rowMasks.get(i)) {
                int best = -1;
                for (Map.Entry<Integer, Integer> e : states.entrySet()) {
                    int prev = e.getKey();
                    // no student directly above-left or above-right
                    if ((mask & ((prev << 1) | (prev >> 1))) != 0) continue;
                    if (e.getValue() > best) best = e.getValue();
                }
                if (best >= 0) {
                    int v = best + Integer.bitCount(mask);
                    Integer cur = newStates.get(mask);
                    if (cur == null || v > cur) newStates.put(mask, v);
                }
            }
            states = newStates;
        }
        int ans = 0;
        for (int v : states.values()) {
            if (v > ans) ans = v;
        }
        return ans;
    }
}
