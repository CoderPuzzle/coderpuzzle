class Solution {
  public:
    int missingInteger(vector<int> &nums) {
        // The floor of the answer is the sum of the longest prefix in which
        // every value is exactly its predecessor plus one; the first break
        // in that progression ends the prefix, so one scan settles it.
        int total = nums[0];
        for (int i = 1; i < (int)nums.size(); ++i) {
            if (nums[i] != nums[i - 1] + 1)
                break;
            total += nums[i];
        }
        // From that floor, step upward past every value the array holds;
        // the first gap is the smallest missing integer.
        unordered_set<int> present(nums.begin(), nums.end());
        while (present.count(total)) {
            total += 1;
        }
        return total;
    }
};
