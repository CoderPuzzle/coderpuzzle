class Solution {
  public:
    vector<int> applyOperations(vector<int> &nums) {
        // Phase 1: apply the n-1 operations left to right; doubling an
        // element zeroes its right neighbor, which the next comparison sees.
        vector<int> result(nums);
        for (int i = 0; i + 1 < (int)result.size(); ++i) {
            if (result[i] == result[i + 1]) {
                result[i] *= 2;
                result[i + 1] = 0;
            }
        }
        // Phase 2: stable-compact non-zero values to the front, then pad.
        int write = 0;
        for (int read = 0; read < (int)result.size(); ++read) {
            if (result[read] != 0)
                result[write++] = result[read];
        }
        while (write < (int)result.size())
            result[write++] = 0;
        return result;
    }
};
