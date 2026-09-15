class Solution {
  public:
    long long maximumImportance(int n, vector<vector<int>> &roads) {
        // Degrees in 64-bit: rank * degree reaches ~2.5e9, past INT32_MAX.
        vector<long long> degrees(n, 0);
        for (auto &road : roads) {
            degrees[road[0]]++;
            degrees[road[1]]++;
        }
        sort(degrees.begin(), degrees.end());
        long long total = 0;
        for (int rank = 0; rank < n; rank++) {
            total += (long long)(rank + 1) * degrees[rank];
        }
        return total;
    }
};
