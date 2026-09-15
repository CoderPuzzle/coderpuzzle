class Solution {
  public:
    vector<vector<long long>> splitPainting(vector<vector<int>> &segments) {
        // Difference events per segment: +color at its start, -color at its
        // end. The mixed sum is piecewise constant and can only change at
        // these coordinates.
        map<long long, long long> diff;
        for (auto &seg : segments) {
            diff[(long long)seg[0]] += seg[2];
            diff[(long long)seg[1]] -= seg[2];
        }
        vector<vector<long long>> result;
        long long running = 0;
        bool first = true;
        long long prevKey = 0;
        for (auto &e : diff) {
            // Between consecutive event coordinates the active set is fixed,
            // so running is the mixed color on that open interval. Colors are
            // distinct, so each event genuinely changes the sum -- emitting
            // at every coordinate is minimal. Positive check skips unpainted
            // gaps where nothing is active.
            if (!first && running > 0) {
                result.push_back({prevKey, e.first, running});
            }
            running += e.second;
            prevKey = e.first;
            first = false;
        }
        return result;
    }
};
