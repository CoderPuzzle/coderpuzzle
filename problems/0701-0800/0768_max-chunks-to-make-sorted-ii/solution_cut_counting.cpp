class Solution {
  public:
    int maxChunksToSorted(vector<int> &arr) {
        // A boundary is legal exactly when the prefix's largest entry is
        // no greater than every entry after the cut — non-strict, which
        // is what keeps repeated values legal at equal boundaries.
        vector<int> suffix_min(arr);
        for (int i = (int)arr.size() - 2; i >= 0; i--) {
            suffix_min[i] = min(suffix_min[i], suffix_min[i + 1]);
        }
        int blocks = 1;
        int prefix_max = arr[0];
        for (size_t i = 1; i < arr.size(); i++) {
            // The prefix holds the smallest i+1 entries exactly when its
            // running maximum does not exceed the suffix minimum.
            if (prefix_max <= suffix_min[i])
                blocks++;
            prefix_max = max(prefix_max, arr[i]);
        }
        return blocks;
    }
};
