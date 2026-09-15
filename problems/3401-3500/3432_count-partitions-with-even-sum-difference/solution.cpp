class Solution {
  public:
    int countPartitions(vector<int> &nums) {
        // left - right = total - 2 * right, and twice any integer is even,
        // so every partition's difference carries the total's parity: either
        // all n - 1 splits are even (total even) or none is (total odd).
        int total = 0;
        for (int v : nums) {
            total += v;
        }
        return total % 2 == 0 ? (int)nums.size() - 1 : 0;
    }
};
