class Solution {
  public:
    int minFlipsMonoIncr(string s) {
        // A monotone increasing string is a block of 0's then a block of 1's, so
        // a flip plan only chooses where the boundary sits. The sweep keeps
        // ones, the 1's seen so far, and flips, the cheapest repair of the
        // prefix read so far: a '1' may always stay — appending 1 to a monotone
        // prefix leaves it monotone — while a '0' is either flipped at cost
        // flips + 1 or kept, which is legal only once every earlier 1 has been
        // flipped, at cost ones — so flips = min(flips + 1, ones).
        int ones = 0;
        int flips = 0;
        for (char c : s) {
            if (c == '0') {
                flips = min(flips + 1, ones);
            } else {
                ++ones;
            }
        }
        return flips;
    }
};
