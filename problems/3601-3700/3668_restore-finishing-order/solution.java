import java.util.HashSet;
import java.util.Set;

class Solution {

    public int[] recoverOrder(int[] order, int[] friends) {
        // The roster is capped at eight ids, so a hash set answers every
        // membership test in O(1) expected time.
        Set<Integer> wanted = new HashSet<>();
        for (int friend : friends) {
            wanted.add(friend);
        }
        // Every friend appears in order, so the answer has exactly one slot
        // per roster entry; scanning order fills those slots already in
        // finishing order -- no sorting step is needed.
        int[] ans = new int[friends.length];
        int written = 0;
        for (int racer : order) {
            if (wanted.contains(racer)) {
                ans[written++] = racer;
            }
        }
        return ans;
    }
}
