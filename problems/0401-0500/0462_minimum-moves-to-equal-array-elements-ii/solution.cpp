class Solution {
  public:
    int minMoves2(vector<int> &nums) {
        // Each move shifts one element by one unit, so gathering everything
        // on a target t costs exactly sum |x - t| — and a sum of absolute
        // distances is minimized at the median. Pairing the sorted values
        // outermost-inward shows why: a pair pays its full gap wherever its
        // two elements meet, so any pivot between the two middles is
        // optimal, and the lower middle element is as good as any.
        sort(nums.begin(), nums.end());
        long long pivot = nums[(nums.size() - 1) / 2];
        // Each distance is up to 2*10^9 and there are up to 10^5 of them, so
        // the running total spans 2*10^14 — far beyond int range. It
        // accumulates as long long; only the promised 32-bit answer comes
        // back out.
        long long total = 0;
        for (int value : nums) {
            total += llabs(value - pivot);
        }
        return int(total);
    }
};
