class Solution {
  public:
    bool checkSubarraySum(vector<int> &nums, int k) {
        // Two prefixes with the same remainder mod k sandwich a subarray
        // whose sum is a multiple of k, so one pass keeps the running
        // remainder and the FIRST index it was seen at. The empty prefix
        // already has remainder 0 — seeding it at index -1 certifies
        // windows starting at index 0 and makes a zero-sum pair like
        // [0, 0] good, since 0 is a multiple of every k.
        unordered_map<int, int> firstIndex;
        firstIndex[0] = -1;
        int remainder = 0;
        for (int index = 0; index < (int)nums.size(); ++index) {
            // values reach 1e9 and k reaches 2^31 - 1, so reduce in long
            // long before the remainder lands back inside int range.
            remainder = (int)(((long long)remainder + nums[index]) % k);
            auto found = firstIndex.find(remainder);
            // A repeat is a good subarray only when it spans two or more
            // elements, and only the earliest occurrence gives the widest
            // span — keep first, never overwrite.
            if (found != firstIndex.end() && index - found->second >= 2)
                return true;
            firstIndex.emplace(remainder, index);
        }
        return false;
    }
};
