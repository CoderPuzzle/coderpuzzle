class Solution {
  public:
    int maximumWhiteTiles(vector<vector<int>> &tiles, int carpetLen) {
        // Sort by start, then slide a window of intervals whose left ends fall
        // inside the carpet. Aligning the carpet's left edge with a tile start
        // is always optimal, so trying every tile as the first covered one is
        // enough. Non-overlapping tiles in [1, 1e9] keep every sum within i32,
        // but the reach l + carpetLen - 1 can approach 2e9.
        sort(tiles.begin(), tiles.end());
        int n = (int)tiles.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            prefix[i + 1] = prefix[i] + (tiles[i][1] - tiles[i][0] + 1LL);
        }
        long long ans = 0;
        int j = 0;
        for (int i = 0; i < n; ++i) {
            long long end = (long long)tiles[i][0] + carpetLen - 1;
            while (j < n && tiles[j][0] <= end) {
                ++j;
            }
            long long covered = prefix[j] - prefix[i];
            if (tiles[j - 1][1] > end) {
                covered -= tiles[j - 1][1] - end;
            }
            ans = max(ans, covered);
        }
        return (int)ans;
    }
};
