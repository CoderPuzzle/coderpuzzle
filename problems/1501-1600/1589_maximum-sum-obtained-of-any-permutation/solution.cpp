class Solution {
  public:
    int maxSumRangeQuery(vector<int> &nums, vector<vector<int>> &requests) {
        int n = (int)nums.size();
        // Difference array: +1 at the start of each request's range, -1 just
        // past its end; a prefix sum then turns this into per-index request
        // coverage counts instead of re-walking every request's range.
        vector<int> diff(n + 1, 0);
        for (auto &request : requests) {
            diff[request[0]] += 1;
            diff[request[1] + 1] -= 1;
        }
        vector<int> freq(n);
        int running = 0;
        for (int i = 0; i < n; ++i) {
            running += diff[i];
            freq[i] = running;
        }
        // Rearrangement inequality: pairing the largest values with the
        // largest weights (both sorted descending) maximizes the sum of
        // pairwise products.
        vector<int> sortedNums = nums;
        sort(sortedNums.begin(), sortedNums.end(), greater<int>());
        sort(freq.begin(), freq.end(), greater<int>());
        const long long MOD = 1'000'000'007LL;
        long long total = 0;
        for (int i = 0; i < n; ++i) {
            total += (long long)sortedNums[i] * freq[i];
        }
        return (int)(total % MOD);
    }
};
