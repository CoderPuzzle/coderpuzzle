class Solution {
  public:
    int sumIndicesWithKSetBits(vector<int> &nums, int k) {
        // Every value is at most 10^5 and there are at most 1000 of them,
        // so the answer stays inside a signed 32-bit int.
        int answer = 0;
        for (int index = 0; index < (int)nums.size(); index++) {
            int set_bits = 0;
            for (int rest = index; rest > 0; rest &= rest - 1) {
                set_bits++;
            }
            if (set_bits == k) {
                answer += nums[index];
            }
        }
        return answer;
    }
};
