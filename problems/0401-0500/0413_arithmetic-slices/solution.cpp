class Solution {
  public:
    int numberOfArithmeticSlices(vector<int> &nums) {
        // Slices are counted by their right end: an element that keeps the run
        // arithmetic extends every slice ending one step earlier plus adds a
        // fresh length-3 one, so current steps up by one each time.
        int total = 0;
        int current = 0;
        for (int i = 2; i < (int)nums.size(); ++i) {
            if (nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]) {
                ++current;
                total += current;
            } else {
                // The run is broken; no slice crosses the new difference.
                current = 0;
            }
        }
        return total;
    }
};
