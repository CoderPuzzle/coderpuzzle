class Solution {
  public:
    int reverseBits(int n) {
        // Treat n as a 32-bit pattern: unsigned shifts keep the semantics
        // honest even for patterns the signed contract never produces.
        unsigned int remaining = n;
        unsigned int reversed = 0;
        for (int i = 0; i < 32; ++i) {
            reversed = (reversed << 1) | (remaining & 1);
            remaining >>= 1;
        }
        return static_cast<int>(reversed);
    }
};
