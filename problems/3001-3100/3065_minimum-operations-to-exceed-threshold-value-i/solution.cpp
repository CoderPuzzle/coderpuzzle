class Solution {
  public:
    int minOperations(vector<int> &nums, int k) {
        // Every removal takes the current smallest element, so exactly the
        // values strictly below k get removed, each exactly once.
        int count = 0;
        for (int value : nums) {
            if (value < k)
                ++count;
        }
        return count;
    }
};
