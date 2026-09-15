class Solution {

    public int numJewelsInStones(String jewels, String stones) {
        // A stone counts when its letter is one of the jewel types. Those
        // types are case sensitive and English letters occupy two disjoint
        // ASCII bands, 65..90 and 97..122, so a direct 128-slot table keyed
        // by character code marks each jewel letter in place — 'a' and 'A'
        // land in different slots with no folding — and every stone then
        // costs one array lookup.
        boolean[] isJewel = new boolean[128];
        for (int i = 0; i < jewels.length(); i++) {
            isJewel[jewels.charAt(i)] = true;
        }
        int count = 0;
        for (int i = 0; i < stones.length(); i++) {
            if (isJewel[stones.charAt(i)]) {
                count++;
            }
        }
        return count;
    }
}
