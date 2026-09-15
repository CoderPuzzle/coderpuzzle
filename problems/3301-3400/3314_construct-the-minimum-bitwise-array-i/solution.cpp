class Solution {
  public:
    vector<int> minBitwiseArray(vector<int> &nums) {
        // a OR (a + 1) >= a + 1, so any solution for x satisfies a <= x - 1;
        // scanning candidates from 0 up, the first hit is the minimum. The
        // value a OR (a + 1) always ends in a 1 bit, hence odd, and the only
        // even prime is 2 — that entry scans to no candidate and reports -1.
        vector<int> ans;
        ans.reserve(nums.size());
        for (int x : nums) {
            int found = -1;
            for (int a = 0; a < x; ++a) {
                if ((a | (a + 1)) == x) {
                    found = a;
                    break;
                }
            }
            ans.push_back(found);
        }
        return ans;
    }
};
