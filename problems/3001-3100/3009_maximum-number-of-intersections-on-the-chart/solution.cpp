class Solution {
  public:
    int maxIntersectionCount(vector<int> &y) {
        // The count only changes when the line passes a vertex height, so
        // testing each compressed height v just above (v + 0.5) and exactly
        // at v suffices. Every segment stamps its half-level range
        // [lo, hi - 1] and its strict interior [lo + 1, hi - 1] into two
        // difference arrays; a prefix pass then reads both counts per
        // height, the at-level one plus a point for each vertex on the line.
        vector<int> heights(y);
        sort(heights.begin(), heights.end());
        heights.erase(unique(heights.begin(), heights.end()), heights.end());
        unordered_map<int, int> rank;
        for (int i = 0; i < (int)heights.size(); ++i) {
            rank[heights[i]] = i;
        }
        int m = heights.size();
        vector<int> above(m, 0);
        vector<int> at(m, 0);
        for (int i = 0; i + 1 < (int)y.size(); ++i) {
            int lo = min(y[i], y[i + 1]);
            int hi = max(y[i], y[i + 1]);
            ++above[rank[lo]];
            --above[rank[hi]];
            if (hi - lo > 1) {
                ++at[rank[lo] + 1];
                --at[rank[hi]];
            }
        }
        unordered_map<int, int> seen;
        for (int h : y) {
            ++seen[h];
        }
        int best = 0;
        int spans_above = 0;
        int spans_at = 0;
        for (int i = 0; i < m; ++i) {
            spans_above += above[i];
            spans_at += at[i];
            best = max(best, max(spans_above, spans_at + seen[heights[i]]));
        }
        return best;
    }
};
