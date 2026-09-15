class Solution {
  public:
    bool checkStrings(string s1, string s2) {
        // Swapping indices whose distance is even keeps every character inside
        // its own index-parity class, and any two positions of one class are
        // directly swappable, so each class is freely rearrangeable. The strings
        // can therefore be made equal exactly when each parity class holds the
        // same multiset of characters in both strings.
        array<array<int, 26>, 2> counts{};
        for (int index = 0; index < (int)s1.size(); ++index)
            ++counts[index % 2][s1[index] - 'a'];
        for (int index = 0; index < (int)s2.size(); ++index) {
            if (--counts[index % 2][s2[index] - 'a'] < 0)
                // s2's parity class needs a copy this character s1 cannot supply.
                return false;
        }
        return true;
    }
};
