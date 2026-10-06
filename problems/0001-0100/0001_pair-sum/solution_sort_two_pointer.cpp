class Solution {
  public:
    vector<int> pairSum(vector<int> &nums, int target) {
        // Order the positions by their values: the pair hunt can then run as
        // a converging scan, while each position rides along with its value.
        vector<int> order(nums.size());
        iota(order.begin(), order.end(), 0);
        sort(order.begin(), order.end(), [&](int a, int b) { return nums[a] < nums[b]; });
        // Converging pointers over that order. A too-small total can only be
        // raised by advancing low; a too-large one only lowered by retreating
        // high -- each step retires one position as a possible member.
        int low = 0, high = (int)order.size() - 1;
        while (low < high) {
            int total = nums[order[low]] + nums[order[high]];
            if (total == target) {
                // The positions come out in value order; either ordering of
                // the two is accepted.
                return {order[low], order[high]};
            }
            if (total < target) {
                ++low;
            } else {
                --high;
            }
        }
        // Statement promises a solution exists; empty is just the fallback.
        return {};
    }
};
