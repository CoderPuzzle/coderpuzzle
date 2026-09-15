class Solution {
  public:
    long long maxScore(vector<int> &nums) {
        // The optimal path always lands on the farthest index attaining the
        // maximum of the remaining suffix: every element after the current
        // position is at most that maximum, so routing through it trades
        // each leg for at least as much value per unit of distance over the
        // same ground, and equal maxima favor the later occurrence (same
        // value, longer hop). Build those farthest suffix argmaxes right to
        // left, then walk the chain from index 0.
        int n = nums.size();
        vector<int> farthest(n);
        farthest[n - 1] = n - 1;
        for (int i = n - 2; i >= 0; i--) {
            farthest[i] = nums[i] > nums[farthest[i + 1]] ? i : farthest[i + 1];
        }
        long long score = 0;
        int pos = 0;
        while (pos < n - 1) {
            int next = farthest[pos + 1];
            score += static_cast<long long>(next - pos) * nums[next];
            pos = next;
        }
        return score;
    }
};
