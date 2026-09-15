class Solution {
  public:
    vector<int> numberGame(vector<int> &nums) {
        // Each round hands Alice the round's smallest value and Bob the next
        // smallest, but Bob appends first — so the sorted array with every
        // adjacent pair swapped is exactly arr.
        vector<int> arr = nums;
        sort(arr.begin(), arr.end());
        for (int i = 0; i + 1 < (int)arr.size(); i += 2) {
            swap(arr[i], arr[i + 1]);
        }
        return arr;
    }
};
