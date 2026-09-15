class Solution {
  public:
    int earliestSecondToMarkIndices(vector<int> &nums, vector<int> &changeIndices) {
        int n = nums.size();
        auto can_mark = [&](int t) {
            vector<int> last(n, 0);
            for (int s = 1; s <= t; ++s)
                last[changeIndices[s - 1] - 1] = s;
            long long need = 0;
            int marked = 0;
            for (int s = 1; s <= t; ++s) {
                int i = changeIndices[s - 1] - 1;
                if (last[i] == s) {
                    need += nums[i];
                    ++marked;
                    if (need > s - marked)
                        return false;
                }
            }
            return marked == n;
        };
        int lo = 1, hi = changeIndices.size();
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (can_mark(mid))
                hi = mid;
            else
                lo = mid + 1;
        }
        return can_mark(lo) ? lo : -1;
    }
};
