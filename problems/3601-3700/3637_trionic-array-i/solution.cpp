class Solution {
  public:
    bool isTrionic(vector<int> &nums) {
        // Walk the leading strictly increasing stretch; any valid cut point
        // p must land exactly where this rise stops, because the mandatory
        // descent out of p is what ends it.
        int n = nums.size();
        int i = 1;
        while (i < n && nums[i] > nums[i - 1]) {
            i++;
        }
        // The peak needs company on both sides: at least one rising step
        // before it, room before the last index, and a strict drop after it.
        if (i == 1 || i == n || nums[i] == nums[i - 1]) {
            return false;
        }
        // Walk the descent from the peak; where it stops is the valley q.
        int j = i + 1;
        while (j < n && nums[j] < nums[j - 1]) {
            j++;
        }
        // The valley must leave room for a final strict rise.
        if (j == n || nums[j] == nums[j - 1]) {
            return false;
        }
        // The rest must climb without interruption, all the way to the end.
        int k = j + 1;
        while (k < n && nums[k] > nums[k - 1]) {
            k++;
        }
        return k == n;
    }
};
