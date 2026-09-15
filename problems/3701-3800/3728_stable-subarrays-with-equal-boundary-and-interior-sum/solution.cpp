class Solution {
  public:
    long long countStableSubarrays(vector<int> &capacity) {
        int n = capacity.size();
        // Prefix sums reach n * 10^9 = 10^14, well past 32 bits, so they
        // accumulate in 64-bit integers even though each element fits.
        vector<long long> prefix(n);
        prefix[0] = capacity[0];
        for (int i = 1; i < n; i++) {
            prefix[i] = prefix[i - 1] + capacity[i];
        }
        // With p the inclusive prefix sums, [l, r] is stable exactly when
        // (capacity[l], p[l]) equals (capacity[r], p[r - 1] - capacity[r]):
        // equal boundary values, and an interior sum that reduces to plain
        // prefix equality.
        map<pair<int, long long>, long long> seen;
        long long count = 0;
        for (int r = 2; r < n; r++) {
            int left = r - 2;
            ++seen[{capacity[left], prefix[left]}];
            auto it = seen.find({capacity[r], prefix[r - 1] - capacity[r]});
            if (it != seen.end()) {
                count += it->second;
            }
        }
        return count;
    }
};
