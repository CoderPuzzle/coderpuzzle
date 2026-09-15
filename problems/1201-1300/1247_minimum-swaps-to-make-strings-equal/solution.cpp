class Solution {
  public:
    int minimumSwap(string s1, string s2) {
        // Each swap fixes two mismatches, so an odd total is impossible.
        int xy = 0, yx = 0;
        for (size_t i = 0; i < s1.size(); ++i) {
            char a = s1[i], b = s2[i];
            if (a == 'x' && b == 'y')
                ++xy;
            else if (a == 'y' && b == 'x')
                ++yx;
        }
        if ((xy + yx) % 2 == 1)
            return -1;
        // Same-shape pairs cost 1 each; one leftover pair of each shape costs 2.
        return xy / 2 + yx / 2 + (xy % 2 == 1 ? 2 : 0);
    }
};
