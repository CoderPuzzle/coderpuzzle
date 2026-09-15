import java.util.Arrays;

class Solution {

    public int findTheLongestSubstring(String s) {
        int[] bit = new int[26];
        bit['a' - 'a'] = 1;
        bit['e' - 'a'] = 2;
        bit['i' - 'a'] = 4;
        bit['o' - 'a'] = 8;
        bit['u' - 'a'] = 16;
        int[] first = new int[32];
        Arrays.fill(first, -2);
        // empty prefix already has even counts, so a whole-prefix window qualifies
        first[0] = -1;
        int mask = 0;
        int best = 0;
        for (int i = 0; i < s.length(); i++) {
            mask ^= bit[s.charAt(i) - 'a'];
            // equal masks at two indices => all vowel counts even between them;
            // keep only the first occurrence of each mask (earliest maximizes length)
            if (first[mask] != -2) {
                if (i - first[mask] > best) {
                    best = i - first[mask];
                }
            } else {
                first[mask] = i;
            }
        }
        return best;
    }
}
