class Solution {
  public:
    vector<int> lexicographicallySmallestArray(vector<int> &nums, int limit) {
        int n = nums.size();
        // Sort (value, index) pairs so components are contiguous runs of values.
        vector<pair<int, int>> pairs;
        pairs.reserve(n);
        for (int i = 0; i < n; i++)
            pairs.push_back({nums[i], i});
        sort(pairs.begin(), pairs.end()); // lexicographic: value, then index
        vector<int> result(n, 0);
        int i = 0;
        while (i < n) {
            // A maximal run whose consecutive value gaps are all <= limit is
            // exactly one connected component; any larger gap splits it.
            int j = i;
            while (j + 1 < n && pairs[j + 1].first - pairs[j].first <= limit)
                j++;
            // Within a component any permutation is reachable, so place the
            // run's ascending values at its original indices in ascending order.
            vector<int> indices;
            indices.reserve(j - i + 1);
            for (int pos = i; pos <= j; pos++)
                indices.push_back(pairs[pos].second);
            sort(indices.begin(), indices.end());
            for (int p = i; p <= j; p++) {
                result[indices[p - i]] = pairs[p].first;
            }
            i = j + 1;
        }
        return result;
    }
};
