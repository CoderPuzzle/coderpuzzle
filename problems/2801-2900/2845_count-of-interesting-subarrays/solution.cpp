class Solution {
  public:
    long long countInterestingSubarrays(vector<int> &nums, int modulo, int k) {
        // Only whether nums[i] % modulo == k matters, so track pref: the
        // number of hits among the prefix. A subarray is interesting iff its
        // hit count has residue k — prefix-sum counting, applied to
        // residues. Seed residue 0 for the empty prefix so subarrays
        // starting at index 0 are counted.
        unordered_map<int, long long> count;
        count[0] = 1;
        int pref = 0;
        long long ans = 0;
        for (int x : nums) {
            if (x % modulo == k)
                pref++;
            // Right endpoint at i pairs with every earlier boundary l where
            // pref[right] - pref[l] = k (mod modulo); the double-mod keeps
            // the residue non-negative for map lookups.
            int need = ((pref - k) % modulo + modulo) % modulo;
            ans += count[need];
            count[pref % modulo]++;
        }
        return ans;
    }
};
