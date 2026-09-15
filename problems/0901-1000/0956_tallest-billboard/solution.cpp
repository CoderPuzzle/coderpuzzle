class Solution {
  public:
    int tallestBillboard(vector<int> &rods) {
        // DP over the support-height difference. best[d] is the tallest left
        // support reachable with left - right == d; unreachable differences
        // hold -1. Each rod is welded left, welded right, or discarded.
        int total = accumulate(rods.begin(), rods.end(), 0);
        int span = 2 * total + 1;
        vector<int> best(span, -1);
        best[total] = 0; // index d + total keeps every difference non-negative
        for (int rod : rods) {
            vector<int> nxt(span, -1);
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
            best = move(nxt);
        }
        // difference 0 means equal supports; its left height is the answer.
        return best[total];
    }
};
