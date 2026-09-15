class Solution {
  public:
    int maximumStrongPairXor(vector<int> &nums) {
        // Sorted sweep with a sliding window [ceil(y/2), y]: one hash map
        // keyed on the values' bit prefixes (top bit down, each key carrying
        // a leading 1 bit that pins its length), each key counting how many
        // live window values pass through it, answers "best XOR partner of y
        // in the window" greedily. The left pointer retires values whose
        // doubling falls below y.
        sort(nums.begin(), nums.end());
        const int BITS = 20; // nums[i] <= 2^20 - 1
        unordered_map<int, int> prefixes;
        int best = 0;
        int left = 0;
        for (int y : nums) {
            // insert y: one key per prefix length, top bit down
            for (int b = BITS - 1; b >= 0; --b) {
                ++prefixes[(1 << (BITS - b)) | (y >> b)];
            }
            // retire x from the left while 2 * x < y
            while (2 * nums[left] < y) {
                int x = nums[left];
                for (int b = BITS - 1; b >= 0; --b) {
                    auto it = prefixes.find((1 << (BITS - b)) | (x >> b));
                    if (--it->second == 0) {
                        prefixes.erase(it);
                    }
                }
                ++left;
            }
            // query: prefer flipping y's bit while that prefix is live
            int p = 1; // the leading 1 bit, then no value bits yet
            int res = 0;
            for (int b = BITS - 1; b >= 0; --b) {
                int d = (y >> b) & 1;
                int want = (p << 1) | (d ^ 1);
                if (prefixes.count(want) > 0) {
                    res |= 1 << b;
                    p = want;
                } else {
                    p = (p << 1) | d;
                }
            }
            best = max(best, res);
        }
        return best;
    }
};
