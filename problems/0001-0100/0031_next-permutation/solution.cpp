class Solution {
  public:
    vector<int> nextPermutation(vector<int> &nums) {
        // Scan from the right for the pivot: the first element smaller than
        // its successor. Everything after it is a non-increasing suffix, the
        // largest arrangement of that tail, so the pivot is the only position
        // that can still grow while the prefix stays fixed.
        int pivot = (int)nums.size() - 2;
        while (pivot >= 0 && nums[pivot] >= nums[pivot + 1]) {
            pivot--;
        }
        if (pivot >= 0) {
            // The rightmost value exceeding the pivot is the smallest one
            // that does; the >= above means equals are stepped over.
            int successor = (int)nums.size() - 1;
            while (nums[successor] <= nums[pivot]) {
                successor--;
            }
            int temp = nums[pivot];
            nums[pivot] = nums[successor];
            nums[successor] = temp;
        }
        // The suffix is still non-increasing after the swap, so reversing it
        // yields the smallest possible tail. No pivot means the whole array
        // was the last permutation, and the full reverse wraps to the first.
        int left = pivot + 1;
        int right = (int)nums.size() - 1;
        while (left < right) {
            int temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
            right--;
        }
        return nums;
    }
};
