class Solution {
    pair<vector<long long>, long long> mergeCount(vector<long long> &arr) {
        if (arr.size() <= 1)
            return {arr, 0};
        int mid = arr.size() / 2;
        vector<long long> l(arr.begin(), arr.begin() + mid);
        vector<long long> r(arr.begin() + mid, arr.end());
        auto [left, c1] = mergeCount(l);
        auto [right, c2] = mergeCount(r);
        // Pairs inside either half are already counted; only cross pairs
        // remain, and both halves come back sorted.
        long long count = c1 + c2;
        // count cross reverse pairs: left[i] > 2 * right[j]
        // j never restarts: the next left[i] is at least as large, so
        // every right element already passed also qualifies — the sweep is
        // linear per merge level.
        size_t j = 0;
        for (size_t i = 0; i < left.size(); i++) {
            while (j < right.size() && left[i] > 2LL * right[j]) {
                j++;
            }
            count += j;
        }
        // merge
        vector<long long> merged;
        merged.reserve(arr.size());
        size_t i = 0;
        j = 0;
        while (i < left.size() && j < right.size()) {
            if (left[i] <= right[j]) {
                merged.push_back(left[i++]);
            } else {
                merged.push_back(right[j++]);
            }
        }
        while (i < left.size())
            merged.push_back(left[i++]);
        while (j < right.size())
            merged.push_back(right[j++]);
        return {merged, count};
    }

  public:
    int reversePairs(vector<int> &nums) {
        // Widen to 64-bit: values reach both int32 extremes and 2 * value
        // would overflow.
        vector<long long> arr(nums.begin(), nums.end());
        return (int)mergeCount(arr).second;
    }
};
