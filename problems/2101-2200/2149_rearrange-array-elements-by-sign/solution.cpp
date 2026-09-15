class Solution {
  public:
    vector<int> rearrangeArray(vector<int> &nums) {
        // Each sign keeps its original relative order, so the k-th
        // positive belongs at slot 2k and the k-th negative at 2k + 1 —
        // one scatter pass places every element directly.
        vector<int> result(nums.size());
        int positives = 0;
        int negatives = 0;
        for (int value : nums) {
            if (value > 0) {
                result[2 * positives] = value;
                positives++;
            } else {
                result[2 * negatives + 1] = value;
                negatives++;
            }
        }
        return result;
    }
};
