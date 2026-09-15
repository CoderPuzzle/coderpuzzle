class Solution {
  public:
    int maximumBeauty(vector<int> &nums, int k) {
        // An element can only ever take a value inside [v-k, v+k] — operating
        // moves it anywhere in that range and leaving it alone keeps it there.
        // Two elements can therefore be driven to one common value exactly
        // when their ranges intersect, i.e. their values differ by at most 2k.
        vector<int> arr = nums;
        sort(arr.begin(), arr.end());
        int best = 1;
        int left = 0;
        for (int right = 0; right < (int)arr.size(); right++) {
            // Shrink while the window's extremes do not share a common value;
            // once the extremes fit, every pair inside the window fits too,
            // because sorted order lets the extremes bound every difference.
            while (arr[right] - arr[left] > 2 * k) {
                left++;
            }
            // The whole window can be made equal, so its length is achievable;
            // windows only get longer by growing, never by shrinking.
            best = max(best, right - left + 1);
        }
        return best;
    }
};
