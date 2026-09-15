class Solution {
  public:
    int minimumOperations(vector<int> &nums) {
        unordered_set<int> values;
        for (int num : nums) {
            if (num > 0) {
                values.insert(num);
            }
        }
        return values.size();
    }
};
