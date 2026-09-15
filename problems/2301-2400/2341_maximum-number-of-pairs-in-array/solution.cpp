class Solution {
  public:
    vector<int> numberOfPairs(vector<int> &nums) {
        unordered_map<int, int> counts;
        for (int num : nums) {
            counts[num]++;
        }
        int pairs = 0;
        int leftovers = 0;
        for (auto &[value, count] : counts) {
            pairs += count / 2;
            leftovers += count % 2;
        }
        return {pairs, leftovers};
    }
};
