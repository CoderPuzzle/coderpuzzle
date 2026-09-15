class Solution {
  public:
    long long minOperations(vector<int> &nums1, vector<int> &nums2, int k) {
        // Each operation moves +k units onto one index and -k units off
        // another, so index i needs exactly |diff_i| / k operations
        // pushing it toward its target: every difference must be divisible
        // by k, and the ups must cancel the downs exactly (sum of diffs
        // == 0). Every operation accounts for 2k units of that movement,
        // hence sum(|diff|) / (2k). k == 0 changes nothing per operation,
        // so only arrays that are already equal work. The mass is
        // <= n * 10^9 = 10^14 and answers are <= 5*10^13, both
        // long-long-safe.
        if (k == 0) {
            for (size_t i = 0; i < nums1.size(); ++i) {
                if (nums1[i] != nums2[i])
                    return -1;
            }
            return 0;
        }
        long long net = 0, mass = 0;
        for (size_t i = 0; i < nums1.size(); ++i) {
            long long diff = (long long)nums2[i] - nums1[i];
            long long magnitude = diff < 0 ? -diff : diff;
            long long kk = k;
            if (magnitude % kk != 0)
                return -1;
            net += diff;
            mass += magnitude;
        }
        return net != 0 ? -1 : mass / (2 * k);
    }
};
