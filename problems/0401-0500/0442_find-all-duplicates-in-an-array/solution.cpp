class Solution {
  public:
    vector<int> findDuplicates(vector<int> &nums) {
        // Values in [1, n] let the array index itself be the hash: value v
        // maps to slot v-1, and flipping that slot's sign records "v seen".
        // A slot already negative means |v| was visited before: a duplicate.
        vector<int> duplicates;
        for (int value : nums) {
            int index = abs(value) - 1;
            if (nums[index] < 0) {
                duplicates.push_back(index + 1);
            } else {
                nums[index] = -nums[index];
            }
        }
        // Restore every sign so the array is left as it was found, then emit
        // the ascending order this judge pins on the original's any-order
        // freedom.
        for (int &value : nums) {
            value = abs(value);
        }
        sort(duplicates.begin(), duplicates.end());
        return duplicates;
    }
};
