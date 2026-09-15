class Solution {
  public:
    int numOfSubarrays(vector<int> &arr, int k, int threshold) {
        // window_sum >= k * threshold is the exact integer form of
        // "average >= threshold"; the window updates in O(1) per slide.
        long long need = (long long)k * threshold;
        long long window = 0;
        for (int i = 0; i < k; ++i) {
            window += arr[i];
        }
        int count = window >= need ? 1 : 0;
        for (int i = k; i < (int)arr.size(); ++i) {
            window += arr[i] - arr[i - k];
            if (window >= need) {
                ++count;
            }
        }
        return count;
    }
};
