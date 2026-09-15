class Solution {
  public:
    int maximumXOR(vector<int> &nums) {
        int answer = 0;
        for (int value : nums) {
            answer |= value;
        }
        return answer;
    }
};
