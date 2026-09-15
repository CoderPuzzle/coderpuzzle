class Solution {
  public:
    vector<int> findRightInterval(vector<vector<int>> &intervals) {
        // The right interval question is a lower-bound query: pair each
        // start with its index, sort by start, and the answer for an end is
        // the first pair whose start reaches it.
        int n = (int)intervals.size();
        vector<pair<int, int>> order;
        order.reserve(n);
        for (int i = 0; i < n; ++i) {
            order.push_back({intervals[i][0], i});
        }
        sort(order.begin(), order.end());
        vector<int> result;
        result.reserve(n);
        for (int i = 0; i < n; ++i) {
            int end = intervals[i][1];
            // Smallest slot whose start is >= end; n if none. The kept half
            // always contains that boundary, so the window halves until only
            // the boundary is left.
            int lo = 0, hi = n;
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (order[mid].first < end) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            // i may equal j: an end its own start already reaches finds the
            // interval itself; off the end means no start qualifies.
            result.push_back(lo < n ? order[lo].second : -1);
        }
        return result;
    }
};
