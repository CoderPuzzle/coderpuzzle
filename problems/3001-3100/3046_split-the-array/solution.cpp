class Solution {
  public:
    bool isPossibleToSplit(vector<int> &nums) {
        unordered_map<int, int> frequencies;
        for (int num : nums) {
            if (++frequencies[num] > 2) {
                return false;
            }
        }
        return true;
    }
};
