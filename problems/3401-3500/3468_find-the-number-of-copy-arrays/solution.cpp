class Solution {
  public:
    int countArrays(vector<int> &original, vector<vector<int>> &bounds) {
        // copy[0] fixes every later entry: copy[i] = copy[0] + original[i] - original[0].
        // Keep the window of admissible copy[0] values by folding each bound in.
        int lo = bounds[0][0], hi = bounds[0][1];
        for (int i = 1; i < (int)original.size(); ++i) {
            int shift = original[i] - original[0];
            lo = max(lo, bounds[i][0] - shift);
            hi = min(hi, bounds[i][1] - shift);
            if (lo > hi) {
                return 0;
            }
        }
        return hi - lo + 1;
    }
};
