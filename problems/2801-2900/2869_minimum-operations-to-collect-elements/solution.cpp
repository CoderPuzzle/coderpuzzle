class Solution {
  public:
    int minOperations(vector<int> &nums, int k) {
        // Operations only ever drop the last element, so after t operations
        // the collection is exactly the suffix of length t.
        vector<char> marked(k + 1, 0);
        int collected = 0;
        for (int i = (int)nums.size() - 1; i >= 0; --i) {
            if (nums[i] <= k && !marked[nums[i]]) {
                marked[nums[i]] = 1;
                if (++collected == k) {
                    // The wanted values 1..k all sit in the removed suffix.
                    return (int)nums.size() - i;
                }
            }
        }
        // Unreachable for valid inputs: 1..k is guaranteed collectible.
        return (int)nums.size();
    }
};
