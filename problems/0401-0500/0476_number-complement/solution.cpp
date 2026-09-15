class Solution {
  public:
    int findComplement(int num) {
        // The mask climbs to 2^31 - 1 at the top of the range — the exact
        // ceiling of a signed 32-bit int — so it is built in long long to
        // keep the doubling away from that boundary.
        long long mask = 1;
        // Doubling a run of ones and adding one extends it by one bit —
        // 1 -> 11 -> 111 — so mask is always 2^k - 1 covering num's window.
        while (mask < num) {
            mask = mask * 2 + 1;
        }
        // XOR with the all-ones window flips every bit num occupies and
        // nothing above it.
        return static_cast<int>(num ^ mask);
    }
};
