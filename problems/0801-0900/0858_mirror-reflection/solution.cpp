class Solution {
  public:
    int mirrorReflection(int p, int q) {
        // Unfolding the mirrored room into a straight corridor turns the
        // ray into the line y = (q/p)x: it first reaches a corner of the
        // tiling after crossing p/g rooms across and q/g rooms up, where
        // g is the gcd of p and q. Folding the counts back, an odd count
        // across ends on the east wall (an even one on the west) and an
        // odd count up ends on the north wall (an even one on the south).
        // The coprime pair p/g, q/g is never both even, so it picks the
        // receptor directly: east-north 1, west-north 2, east-south 0.
        // All values stay at the input's own scale, so int suffices.
        int a = p;
        int b = q;
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        p /= a;
        q /= a;
        if (p % 2 == 0) {
            return 2;
        }
        return q % 2 == 1 ? 1 : 0;
    }
};
