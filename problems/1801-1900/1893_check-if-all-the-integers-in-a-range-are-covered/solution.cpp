class Solution {
  public:
    // +1 at start, -1 past end, running sum > 0 means covered.
    bool isCovered(vector<vector<int>> &ranges, int left, int right) {
        vector<int> diff(52, 0);
        for (const auto &r : ranges) {
            diff[r[0]] += 1;
            diff[r[1] + 1] -= 1;
        }
        array<bool, 51> cover{};
        int cur = 0;
        for (int x = 1; x <= 50; x++) {
            cur += diff[x];
            cover[x] = cur > 0;
        }
        for (int x = left; x <= right; x++) {
            if (!cover[x])
                return false;
        }
        return true;
    }
};
