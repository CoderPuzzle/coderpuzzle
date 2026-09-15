class Solution {
  public:
    vector<int> decompressRLElist(vector<int> &nums) {
        // Size the output up front: it is the sum of all frequencies.
        int total = 0;
        for (int i = 0; i < (int)nums.size(); i += 2) {
            total += nums[i];
        }
        vector<int> out;
        out.reserve(total);
        for (int i = 0; i < (int)nums.size(); i += 2) {
            out.insert(out.end(), nums[i], nums[i + 1]);
        }
        return out;
    }
};
