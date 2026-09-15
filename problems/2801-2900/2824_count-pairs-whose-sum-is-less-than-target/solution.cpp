class Solution {
  public:
    int countPairs(vector<int> &nums, int target) {
        // Unordered index pairs are unaffected by order, so sorting a copy is
        // safe. Values lie in [-50, 50], so every pair sum stays inside int.
        vector<int> sortedNums = nums;
        sort(sortedNums.begin(), sortedNums.end());
        int answer = 0;
        int lo = 0;
        int hi = static_cast<int>(sortedNums.size()) - 1;
        while (lo < hi) {
            if (sortedNums[lo] + sortedNums[hi] < target) {
                answer += hi - lo;
                ++lo;
            } else {
                --hi;
            }
        }
        return answer;
    }
};
