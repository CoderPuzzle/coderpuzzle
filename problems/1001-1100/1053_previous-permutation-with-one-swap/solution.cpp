class Solution {
  public:
    vector<int> prevPermOpt1(vector<int> &arr) {
        int n = arr.size();
        // Rightmost index i with arr[i] > arr[i + 1]: everything after it
        // is already non-decreasing, so i is the latest position whose
        // value can still be lowered by a single swap.
        int i = -1;
        for (int k = n - 2; k >= 0; --k) {
            if (arr[k] > arr[k + 1]) {
                i = k;
                break;
            }
        }
        if (i == -1) {
            return arr;
        }
        // Track the largest value strictly less than arr[i]; scanning
        // left to right and updating only on a strictly larger candidate
        // keeps the leftmost occurrence of that maximum among ties, which
        // is what maximizes the resulting array.
        int j = -1;
        int best = -1;
        for (int k = i + 1; k < n; ++k) {
            if (arr[k] < arr[i] && arr[k] > best) {
                best = arr[k];
                j = k;
            }
        }
        swap(arr[i], arr[j]);
        return arr;
    }
};
