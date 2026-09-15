class Solution {
  public:
    long long minIncrementForUnique(vector<int> &nums) {
        // Sorted, an element never regrets landing on the first free value
        // above its predecessor's final value — anything higher wastes moves.
        sort(nums.begin(), nums.end());
        long long moves = 0;
        int prev = nums[0];
        int n = nums.size();
        for (int i = 1; i < n; i++) {
            int need = prev + 1 - nums[i];
            if (need > 0) {
                moves += need;
                prev = nums[i] + need;
            } else {
                prev = nums[i];
            }
        }
        return moves;
    }
};
