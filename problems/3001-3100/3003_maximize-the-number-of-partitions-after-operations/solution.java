import java.util.ArrayList;
import java.util.List;

class Solution {

    // Two-element rows: open-window letter mask and the best
    // completed-partition count for it.
    private static void merge(List<int[]> pool, int mask, int count) {
        for (int[] state : pool) {
            if (state[0] == mask) {
                state[1] = Math.max(state[1], count);
                return;
            }
        }
        pool.add(new int[] { mask, count });
    }

    public int maxPartitionsAfterOperations(String s, int k) {
        // Sweep left to right carrying every segmentation state reachable
        // with the one allowed change unspent or already spent exactly
        // once. The unspent side is a single lineage (no change means the
        // greedy is forced); the spent side holds (open-window mask, best
        // completed count) pairs, merged on equal masks because what
        // happens next depends only on the mask.
        int unspentMask = 0;
        int unspentCount = 0;
        List<int[]> spent = new ArrayList<>();
        for (int i = 0; i < s.length(); ++i) {
            int bit = 1 << (s.charAt(i) - 'a');
            List<int[]> next = new ArrayList<>(spent.size() + 26);
            for (int[] state : spent) {
                int mask = state[0];
                int count = state[1];
                if ((mask & bit) == 0) {
                    if (Integer.bitCount(mask) == k) {
                        mask = bit;
                        ++count;
                    } else {
                        mask |= bit;
                    }
                }
                merge(next, mask, count);
            }
            for (int letter = 0; letter < 26; ++letter) {
                int branch = 1 << letter;
                if (branch == bit) continue;
                int mask = unspentMask;
                int count = unspentCount;
                if ((mask & branch) == 0) {
                    if (Integer.bitCount(mask) == k) {
                        mask = branch;
                        ++count;
                    } else {
                        mask |= branch;
                    }
                }
                merge(next, mask, count);
            }
            spent = next;
            if ((unspentMask & bit) == 0) {
                if (Integer.bitCount(unspentMask) == k) {
                    unspentMask = bit;
                    ++unspentCount;
                } else {
                    unspentMask |= bit;
                }
            }
        }
        int best = unspentCount;
        for (int[] state : spent) {
            best = Math.max(best, state[1]);
        }
        return best + 1; // the final open partition always counts
    }
}
