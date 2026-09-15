class Solution {
  public:
    int longestEqualSubarray(vector<int> &nums, int k) {
        unordered_map<int, vector<int>> positionsByValue;
        for (int i = 0; i < (int)nums.size(); i++) {
            positionsByValue[nums[i]].push_back(i);
        }
        int answer = 0;
        for (auto &[value, positions] : positionsByValue) {
            int left = 0;
            for (int right = 0; right < (int)positions.size(); right++) {
                // Span length minus kept copies is the deletion cost.
                while ((positions[right] - positions[left]) - (right - left) > k) {
                    left++;
                }
                answer = max(answer, right - left + 1);
            }
        }
        return answer;
    }
};
