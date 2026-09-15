class Solution {
  public:
    bool hasAlternatingBits(int n) {
        // The fold x = n ^ (n >> 1) sets bit i exactly when bits i and i+1
        // of n differ, and always keeps its top bit set (the bit above n's
        // top is a zero). n alternates exactly when x comes out a solid run
        // of ones, 2^(k+1) - 1 — the one shape whose successor shares no
        // bit with it, so a single AND with x + 1 decides the answer.
        // x can be INT_MAX, so the +1 runs in unsigned, where the wrap is
        // defined.
        unsigned int x = n ^ (n >> 1);
        return (x & (x + 1)) == 0;
    }
};
