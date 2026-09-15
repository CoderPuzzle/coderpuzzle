class Solution {
  public:
    int longestSubarray(vector<int> &nums, int limit) {
        int n = nums.size();
        vector<int> maxq(n), minq(n);
        int mh = 0, mt = 0, sh = 0, st = 0;
        int left = 0;
        int best = 0;
        for (int right = 0; right < n; right++) {
            int x = nums[right];
            while (mt > mh && nums[maxq[mt - 1]] <= x) {
                mt--;
            }
            maxq[mt++] = right;
            while (st > sh && nums[minq[st - 1]] >= x) {
                st--;
            }
            minq[st++] = right;
            while (nums[maxq[mh]] - nums[minq[sh]] > limit) {
                if (maxq[mh] == left) {
                    mh++;
                }
                if (minq[sh] == left) {
                    sh++;
                }
                left++;
            }
            if (right - left + 1 > best) {
                best = right - left + 1;
            }
        }
        return best;
    }
};
