class Solution {
  public:
    int findNumberOfLIS(vector<int> &nums) {
        // lengths[i] / counts[i]: the longest strictly increasing subsequence
        // ending at i, and how many of that length end there. A longer
        // predecessor (nums[j] < nums[i]) resets the count to counts[j], an
        // equally long one adds to it, so each i finishes with the total over
        // its best arrivals. Only the returned answer is promised to fit 32
        // bits - counts below the maximum can stand far higher - so the
        // accumulation stays in long longs.
        int n = nums.size();
        vector<int> lengths(n, 1);
        vector<long long> counts(n, 1);
        int best = 0;
        long long answer = 0;
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < i; ++j) {
                if (nums[j] >= nums[i])
                    continue;
                int candidate = lengths[j] + 1;
                if (candidate > lengths[i]) {
                    lengths[i] = candidate;
                    counts[i] = counts[j];
                } else if (candidate == lengths[i]) {
                    counts[i] += counts[j];
                }
            }
            if (lengths[i] > best) {
                best = lengths[i];
                answer = counts[i];
            } else if (lengths[i] == best) {
                answer += counts[i];
            }
        }
        return (int)answer;
    }
};
