class Solution {
  public:
    int uniqueXorTriplets(vector<int> &nums) {
        // The ordering i <= j <= k only picks which indices feed the XOR, and
        // XOR ignores order, so every triplet value is (pair XOR) ^ (third
        // element). Collect all pairwise XORs once, then spread them by every
        // element; values stay below 2^11, so both sets hold <= 2048 entries.
        unordered_set<int> pairs;
        for (int a : nums) {
            for (int b : nums) {
                pairs.insert(a ^ b);
            }
        }
        unordered_set<int> triplets;
        for (int p : pairs) {
            for (int v : nums) {
                triplets.insert(p ^ v);
            }
        }
        return (int)triplets.size();
    }
};
