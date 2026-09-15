import java.util.Arrays;

class Solution {

    public int tallestBillboard(int[] rods) {
        // DP over the support-height difference. best[d] is the tallest left
        // support reachable with left - right == d; unreachable differences
        // hold -1. Each rod is welded left, welded right, or discarded.
        int total = 0;
        for (int rod : rods) {
            total += rod;
        }
        int span = 2 * total + 1;
        int[] best = new int[span];
        Arrays.fill(best, -1);
        best[total] = 0; // index d + total keeps every difference non-negative
        for (int rod : rods) {
            int[] nxt = new int[span];
            Arrays.fill(nxt, -1);
            for (int idx = 0; idx < span; idx++) {
                int left = best[idx];
                if (left < 0) {
                    continue;
                }
                if (left > nxt[idx]) {
                    nxt[idx] = left; // discard the rod
                }
                if (left + rod > nxt[idx + rod]) {
                    nxt[idx + rod] = left + rod; // weld onto the left support
                }
                if (left > nxt[idx - rod]) {
                    nxt[idx - rod] = left; // weld onto the right support
                }
            }
            best = nxt;
        }
        // difference 0 means equal supports; its left height is the answer.
        return best[total];
    }
}
