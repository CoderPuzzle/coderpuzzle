class Solution {
  public:
    bool hasGroupsSizeX(vector<int> &deck) {
        // A group is x cards of one value, so once x is picked every count
        // must split into whole groups of x: each count a multiple of x,
        // every card in exactly one group. A partition exists exactly when
        // some x >= 2 divides every count at once, i.e. when the gcd of all
        // counts reaches 2. The fold seeds with 0 because gcd(0, c) = c, so
        // each count is absorbed and the running value stays the gcd of the
        // counts seen so far.
        unordered_map<int, int> counts;
        for (int card : deck) {
            ++counts[card];
        }
        int common = 0;
        for (const auto &entry : counts) {
            common = gcd(common, entry.second);
        }
        return common >= 2;
    }

  private:
    int gcd(int a, int b) {
        while (b != 0) {
            int remainder = a % b;
            a = b;
            b = remainder;
        }
        return a;
    }
};
