class Solution {
  public:
    int unequalTriplets(vector<int> &nums) {
        // Three distinct positions with three distinct values order uniquely
        // by index, so for each value v the valid triplets using v as the
        // value-sorted middle are left * freq[v] * right. Values lie in
        // [1, 1000], so a fixed table indexed by value replaces the map.
        int count[1001] = {};
        for (int value : nums) {
            ++count[value];
        }
        int total = static_cast<int>(nums.size());
        int left = 0;
        int answer = 0;
        for (int value = 1; value <= 1000; ++value) {
            int freq = count[value];
            if (freq != 0) {
                answer += left * freq * (total - left - freq);
                left += freq;
            }
        }
        return answer;
    }
};
