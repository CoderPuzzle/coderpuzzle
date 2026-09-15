class Solution {
  public:
    vector<int> elementInNums(vector<int> &nums, vector<vector<int>> &queries) {
        int length = static_cast<int>(nums.size());
        int cycle = 2 * length;
        vector<int> answer;
        answer.reserve(queries.size());
        for (const auto &query : queries) {
            int phase = query[0] % cycle;
            int index = query[1];
            if (phase < length) {
                int originalIndex = phase + index;
                answer.push_back(originalIndex < length ? nums[originalIndex] : -1);
            } else {
                int restored = phase - length;
                answer.push_back(index < restored ? nums[index] : -1);
            }
        }
        return answer;
    }
};
