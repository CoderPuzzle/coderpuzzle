class Solution {
  public:
    vector<int> maxValue(vector<int> &nums) {
        int n = nums.size();
        // suf[i]: smallest value in nums[i..n-1]; a sentinel past the end
        // lets the last index always close its segment.
        vector<int> suf(n + 1, 2000000001);
        for (int i = n - 1; i >= 0; i--) {
            suf[i] = min(suf[i + 1], nums[i]);
        }
        // Grow the current segment while its prefix maximum strictly exceeds
        // the suffix minimum just past it: any such boundary is crossed by
        // an inverted pair, so the component cannot end there.
        vector<int> ans;
        ans.reserve(n);
        int segMax = 0, run = 0;
        for (int i = 0; i < n; i++) {
            segMax = max(segMax, nums[i]);
            run++;
            if (i == n - 1 || segMax <= suf[i + 1]) {
                // The segment is closed: every index inside it reaches the
                // segment maximum and nothing beyond it.
                ans.insert(ans.end(), run, segMax);
                segMax = 0;
                run = 0;
            }
        }
        return ans;
    }
};
