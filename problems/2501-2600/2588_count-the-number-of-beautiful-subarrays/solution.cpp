class Solution {
  public:
    long long beautifulSubarrays(vector<int> &nums) {
        // Each operation clears one set bit in each of two elements, so the
        // XOR of a subarray is invariant; it reduces to all zeros exactly
        // when its XOR is already 0.
        unordered_map<int, long long> count;
        // Seed with the empty prefix so subarrays starting at index 0 are
        // witnessed when their prefix XOR returns to 0.
        count[0] = 1;
        int x = 0;
        long long ans = 0;
        for (int v : nums) {
            x ^= v;
            // Subarray (j, i] has XOR prefix[j] ^ prefix[i], which vanishes
            // exactly when the prefixes match: each earlier equal prefix is
            // one beautiful subarray ending here.
            ans += count[x];
            count[x] += 1;
        }
        return ans;
    }
};
