class Solution {
  public:
    vector<int> smallestSubarrays(vector<int> &nums) {
        // One pass per bit, right to left: `last` is the nearest index at
        // or after i whose number carries that bit. The OR of nums[i..j]
        // is maximal exactly when j reaches the farthest such index over
        // all bits of the suffix OR, so answer[i] is the largest gap.
        int n = nums.size();
        vector<int> answer(n, 1);
        for (int bit = 0; bit < 30; ++bit) {
            int last = -1;
            for (int i = n - 1; i >= 0; --i) {
                if (nums[i] >> bit & 1)
                    last = i;
                if (last != -1 && last - i + 1 > answer[i])
                    answer[i] = last - i + 1;
            }
        }
        return answer;
    }
};
