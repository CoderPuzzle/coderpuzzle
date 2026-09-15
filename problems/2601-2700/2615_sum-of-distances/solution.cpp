class Solution {
  public:
    vector<long long> distance(vector<int> &nums) {
        // Only equal values interact, so bucket indices by value; each bucket
        // is an independent 1-D problem over its sorted occurrence list.
        unordered_map<int, vector<int>> pos;
        for (int i = 0; i < (int)nums.size(); i++) {
            pos[nums[i]].push_back(i);
        }
        vector<long long> arr(nums.size(), 0);
        for (auto &[x, idxs] : pos) {
            (void)x;
            int m = (int)idxs.size();
            // Prefix sums of the occurrence indices turn every distance total
            // into O(1) arithmetic — vital since one value may dominate.
            vector<long long> prefix(m + 1, 0);
            for (int j = 0; j < m; j++) {
                prefix[j + 1] = prefix[j] + idxs[j];
            }
            for (int j = 0; j < m; j++) {
                long long i = idxs[j];
                // j earlier occurrences each at distance i - idx, then
                // m - 1 - j later ones each at distance idx - i:
                long long left = i * j - prefix[j];
                long long right = (prefix[m] - prefix[j + 1]) - i * (m - 1 - j);
                arr[idxs[j]] = left + right;
            }
        }
        return arr;
    }
};
