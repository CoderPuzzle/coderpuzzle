class Solution {
  public:
    int firstMissingPositive(vector<int> &nums) {
        int n = nums.size();
        // The answer lies in [1, n+1], so value v "belongs" at index v-1:
        // cyclic-sort each in-range value into its home slot.
        for (int i = 0; i < n; i++) {
            // Swap while nums[i] is a positive in [1, n] whose home slot does
            // not already hold it. The != guard also makes duplicates harmless:
            // a duplicate finds its target occupied and stops swapping.
            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                int target = nums[i] - 1;
                swap(nums[i], nums[target]);
            }
        }
        // Every swap places one value in its final position and none ever
        // leaves its slot, so total swaps <= n: O(n) amortized despite nesting.
        for (int i = 0; i < n; i++) {
            // First slot not holding its own value reveals the smallest
            // missing positive; all of 1..n present means the answer is n+1.
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }
        return n + 1;
    }
};
