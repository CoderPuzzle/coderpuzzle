class Solution {
  public:
    vector<int> removeElement(vector<int> &nums, int val) {
        // Write pointer: nums[:k] always holds the survivors seen so far, so
        // one read pass compacts them to the front in place — no shifting.
        int k = 0;
        for (int value : nums) {
            if (value != val)
                nums[k++] = value;
        }
        // The statement frees both the order and the tail beyond k, so the
        // compacted prefix is the whole judged answer; its length is k.
        nums.resize(k);
        return nums;
    }
};
