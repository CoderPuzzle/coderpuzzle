class Solution {
  public:
    int search(vector<int> &nums, int target) {
        // Invariant: if the target exists, its index stays inside nums[lo..hi].
        int lo = 0;
        int hi = (int)nums.size() - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            // Each update also discards mid itself, so the interval at least
            // halves and the loop always terminates.
            if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        // Bounds crossed: the candidate interval is empty, target absent.
        return -1;
    }
};
