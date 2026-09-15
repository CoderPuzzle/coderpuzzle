class Solution {
  public:
    // Every value sits below 2^maximumBit, so the running XOR does too,
    // and XOR with a fixed prefix is a bijection on that range: the
    // maximum of prefix ^ k is reached exactly at k = mask ^ prefix,
    // where mask = 2^maximumBit - 1. Removing the last element just
    // XORs it back out of the running total, so one backward walk
    // answers every prefix without recomputing anything.
    vector<int> getMaximumXor(vector<int> &nums, int maximumBit) {
        const int mask = (1 << maximumBit) - 1;
        int running = 0;
        for (int value : nums)
            running ^= value;
        vector<int> answer;
        answer.reserve(nums.size());
        for (int i = (int)nums.size() - 1; i >= 0; i--) {
            answer.push_back(running ^ mask);
            running ^= nums[i];
        }
        return answer;
    }
};
