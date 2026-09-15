class Solution {
  public:
    // An operation always consumes one x and one k - x, so the answer
    // depends only on how often each value occurs. For x below its
    // complement the pair count is capped by the scarcer side, giving
    // min(count(x), count(k - x)); when k is even, x = k / 2 is its own
    // complement and pairs with itself count(x) / 2 times. Comparing x
    // with k - x directly, never summing two values, keeps every
    // intermediate inside 32 bits.
    int maxOperations(vector<int> &nums, int k) {
        unordered_map<int, int> count;
        for (int value : nums) {
            ++count[value];
        }
        int ops = 0;
        for (const auto &[x, c] : count) {
            int complement = k - x;
            if (x < complement) {
                auto mate = count.find(complement);
                ops += min(c, mate == count.end() ? 0 : mate->second);
            } else if (x == complement) {
                ops += c / 2;
            }
        }
        return ops;
    }
};
