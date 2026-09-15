class Solution {
  public:
    int minOperations(int k) {
        // All increases come first, all duplicates last: a final array of m
        // equal values v costs v-1 increases plus m-1 duplicates and sums to
        // m*v. Enumerate the single-element value v and take ceil(k/v)-1
        // duplicates; the best split wins. With k <= 10^5 every sum fits an
        // int comfortably.
        int best = k - 1;
        for (int v = 1; v <= k; v++) {
            int dup = std::max((k + v - 1) / v - 1, 0);
            best = std::min(best, v - 1 + dup);
        }
        return best;
    }
};
