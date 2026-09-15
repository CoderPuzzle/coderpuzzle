class Solution {
  public:
    vector<int> targetIndices(vector<int> &nums, int target) {
        int smaller = 0;
        int equal = 0;
        for (int value : nums) {
            if (value < target)
                ++smaller;
            else if (value == target)
                ++equal;
        }
        vector<int> answer;
        answer.reserve(equal);
        for (int index = smaller; index < smaller + equal; ++index)
            answer.push_back(index);
        return answer;
    }
};
