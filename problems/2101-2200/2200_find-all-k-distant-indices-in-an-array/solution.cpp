class Solution {
  public:
    vector<int> findKDistantIndices(vector<int> &nums, int key, int k) {
        vector<int> out;
        int nextFree = 0;
        int n = nums.size();
        // each key occurrence contributes the window [j-k, j+k]; windows
        // are naturally ordered, so clip against what's already emitted
        // instead of deduplicating through a set
        for (int j = 0; j < n; j++) {
            if (nums[j] != key) {
                continue;
            }
            int lo = max(nextFree, j - k);
            int hi = min(n - 1, j + k);
            for (int i = lo; i <= hi; i++) {
                out.push_back(i);
            }
            nextFree = hi + 1;
        }
        return out;
    }
};
