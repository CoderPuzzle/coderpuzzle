class Solution {
  public:
    vector<int> maxSubsequence(vector<int> &nums, int k) {
        vector<int> indices(nums.size());
        iota(indices.begin(), indices.end(), 0);
        sort(indices.begin(), indices.end(), [&](int left, int right) {
            if (nums[left] != nums[right]) {
                return nums[left] > nums[right];
            }
            return left < right;
        });
        indices.resize(k);
        sort(indices.begin(), indices.end());

        vector<int> answer;
        answer.reserve(k);
        for (int index : indices) {
            answer.push_back(nums[index]);
        }
        return answer;
    }
};
