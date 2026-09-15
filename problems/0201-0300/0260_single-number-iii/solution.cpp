class Solution {
  public:
    vector<int> singleNumber(vector<int> &nums) {
        // XOR of the whole array: every value appearing twice cancels to
        // zero, so total is the XOR of exactly the two singles.
        int total = 0;
        for (int value : nums) {
            total ^= value;
        }
        // total is nonzero (the singles are distinct); each set bit marks a
        // position where they differ. Isolate the lowest one: negation keeps
        // that bit and flips all lower bits, so the AND leaves exactly it.
        int mask = total & -total;
        // XOR only the values with that bit set. Duplicate pairs land in the
        // same group and cancel again; the singles differ at that bit, so
        // exactly one of them is here — leaving first as that single.
        int first = 0;
        for (int value : nums) {
            if (value & mask) {
                first ^= value;
            }
        }
        // total was the XOR of both singles, so the other falls out for free.
        int second = total ^ first;
        // Swapping only normalizes the output order.
        if (first > second) {
            swap(first, second);
        }
        return {first, second};
    }
};
