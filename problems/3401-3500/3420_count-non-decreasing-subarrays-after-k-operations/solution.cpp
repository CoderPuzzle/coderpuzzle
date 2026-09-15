class Solution {
  public:
    long long countNonDecreasingSubarrays(vector<int> &nums, int k) {
        int n = (int)nums.size();
        long long result = 0;
        long long cnt = 0;
        vector<int> dq(n);
        int tail = 0; // back of deque (next push position)
        int head = 0; // front of deque
        int right = n - 1;
        for (int left = n - 1; left >= 0; left--) {
            // Merge stack segments: raise smaller elements to nums[left].
            while (head < tail && nums[dq[tail - 1]] < nums[left]) {
                int l = dq[--tail];
                int r = head < tail ? dq[tail - 1] - 1 : right;
                cnt += (long long)(r - l + 1) * ((long long)nums[left] - nums[l]);
            }
            dq[tail++] = left;
            // Shrink the window from the right if the cost exceeds k.
            while (cnt > k) {
                cnt -= (long long)nums[dq[head]] - nums[right];
                if (dq[head] == right)
                    head++;
                right--;
            }
            result += right - left + 1;
        }
        return result;
    }
};
