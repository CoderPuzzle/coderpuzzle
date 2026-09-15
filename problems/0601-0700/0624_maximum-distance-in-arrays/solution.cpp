class Solution {
  public:
    int maxDistance(vector<vector<int>> &arrays) {
        // Only each array's first and last elements can sit in an optimal
        // pair, so one sweep holding the smallest first and the largest last
        // of the arrays already seen answers everything. Each new array tries
        // both of its ends against those running extremes — a pairing that
        // always spans two different arrays — and only afterwards folds its
        // own ends in, which keeps the global minimum and maximum from being
        // paired inside a single array.
        int best = 0;
        int lo = arrays[0][0];
        int hi = arrays[0].back();
        for (int i = 1; i < (int)arrays.size(); i++) {
            const vector<int> &arr = arrays[i];
            int first = arr.front();
            int last = arr.back();
            best = max({best, abs(first - hi), abs(last - lo)});
            lo = min(lo, first);
            hi = max(hi, last);
        }
        return best;
    }
};
