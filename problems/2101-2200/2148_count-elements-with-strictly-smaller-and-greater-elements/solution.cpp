class Solution {
  public:
    int countElements(vector<int> &nums) {
        // An element qualifies exactly when it sits strictly between the
        // array's minimum and maximum: a strictly smaller witness exists
        // iff x > min, a strictly larger one iff x < max.
        int lo = INT_MAX;
        int hi = INT_MIN;
        for (int x : nums) {
            lo = min(lo, x);
            hi = max(hi, x);
        }
        int count = 0;
        for (int x : nums) {
            if (x > lo && x < hi)
                count++;
        }
        return count;
    }
};
