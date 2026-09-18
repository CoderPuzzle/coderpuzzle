#include <cstdint>
#include <vector>

class NumArray {
  public:
    NumArray(vector<int> nums) : prefix(nums.size() + 1, 0) {
        // prefix[i] = sum of the first i elements, with prefix[0] = 0 so
        // no query needs a special case for a left edge of zero. Held in
        // long long: prefix sums of 32-bit values.
        // One left-to-right pass; each entry extends the previous by one
        // element. The array is fixed, so summing happens once, not per
        // query.
        for (int index = 0; index < (int)nums.size(); index++) {
            prefix[index + 1] = prefix[index] + nums[index];
        }
    }

    long long sumRange(int left, int right) {
        // The elements before left cancel, telescoping the range sum
        // into a difference of two prefixes — O(1) per query.
        return prefix[right + 1] - prefix[left];
    }

  private:
    vector<int64_t> prefix;
};
