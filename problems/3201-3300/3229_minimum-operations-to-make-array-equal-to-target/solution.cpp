class Solution {
  public:
    long long minimumOperations(vector<int> &nums, vector<int> &target) {
        // Work with d[i] = nums[i] - target[i]: each operation adds +-1 to a
        // contiguous run of d, building it from the all-zero state. An
        // interval's two edges supply one unit of upward step each, so the
        // answer is exactly the sum of positive rises along d, padded with
        // implicit zeros on both sides (lower bound, and achievable by
        // pairing every rise with a later fall into one interval).
        long long prev = 0;
        long long total = 0;
        for (size_t i = 0; i < nums.size(); i++) {
            long long cur = (long long)nums[i] - target[i];
            // Charge only the positive rises; falls ride along for free as
            // the closing edges of intervals opened by earlier rises.
            if (cur > prev)
                total += cur - prev;
            prev = cur;
        }
        // Climbing from a negative last difference back to the trailing
        // implicit zero is one more rise; a final positive difference drops
        // to zero for free (a fall).
        if (prev < 0)
            total += -prev;
        return total;
    }
};
