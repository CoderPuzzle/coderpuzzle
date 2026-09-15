class Solution {
  public:
    int numberOfGoodPartitions(vector<int> &nums) {
        // A value may not straddle a cut, so every free cut sits at an index
        // that has already seen the last occurrence of every value to its
        // left; each such gap independently doubles the count, giving
        // 2^(number of gaps).
        const long long MOD = 1000000007LL;
        unordered_map<int, int> last;
        for (int i = 0; i < (int)nums.size(); ++i) {
            last[nums[i]] = i;
        }
        long long result = 1;
        int reach = 0;
        for (int i = 0; i + 1 < (int)nums.size(); ++i) {
            reach = max(reach, last[nums[i]]);
            if (reach == i) {
                result = result * 2 % MOD;
            }
        }
        return (int)result;
    }
};
