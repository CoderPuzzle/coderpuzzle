class Solution {
  public:
    vector<int> arrayChange(vector<int> &nums, vector<vector<int>> &operations) {
        vector<int> final_name(1000001, -1);
        for (int index = static_cast<int>(operations.size()) - 1; index >= 0; index--) {
            int replaced = operations[index][0];
            int replacement = operations[index][1];
            final_name[replaced] = final_name[replacement] == -1 ? replacement : final_name[replacement];
        }
        vector<int> answer = nums;
        for (int &value : answer) {
            if (final_name[value] != -1) {
                value = final_name[value];
            }
        }
        return answer;
    }
};
