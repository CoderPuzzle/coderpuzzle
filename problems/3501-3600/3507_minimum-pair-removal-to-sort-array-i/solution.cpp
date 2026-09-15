class Solution {
  public:
    // The operation is forced: merge the minimum-sum adjacent pair,
    // leftmost on ties, until the array is non-decreasing. Just simulate
    // -- with n <= 50 a full rescan per step is trivial.
    int minimumPairRemoval(vector<int> &nums) {
        vector<int> arr = nums;
        int ops = 0;
        auto sorted = [&arr]() {
            for (int i = 1; i < (int)arr.size(); ++i) {
                if (arr[i - 1] > arr[i])
                    return false;
            }
            return true;
        };
        while (!sorted()) {
            int best = 0;
            for (int i = 1; i + 1 < (int)arr.size(); ++i) {
                if (arr[i] + arr[i + 1] < arr[best] + arr[best + 1]) {
                    best = i;
                }
            }
            // strict < keeps the earliest of equal-sum pairs
            arr[best] += arr[best + 1];
            arr.erase(arr.begin() + best + 1);
            ++ops;
        }
        return ops;
    }
};
