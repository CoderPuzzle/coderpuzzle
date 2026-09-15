class Solution {
  public:
    int numJewelsInStones(string jewels, string stones) {
        // A stone counts when its letter is one of the jewel types. Those
        // types are case sensitive and English letters occupy two disjoint
        // ASCII bands, 65..90 and 97..122, so a direct 128-slot table keyed
        // by character code marks each jewel letter in place — 'a' and 'A'
        // land in different slots with no folding — and every stone then
        // costs one array lookup.
        bool isJewel[128] = {};
        for (char c : jewels) {
            isJewel[c] = true;
        }
        int count = 0;
        for (char c : stones) {
            if (isJewel[c]) {
                count++;
            }
        }
        return count;
    }
};
