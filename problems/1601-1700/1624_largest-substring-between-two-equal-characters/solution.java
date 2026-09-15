class Solution {

    public int maxLengthBetweenEqualCharacters(String s) {
        // Only a character's first and last occurrence can bound the widest
        // gap for that character, so a single pass recording first-seen
        // indices is enough.
        int[] first = new int[26];
        java.util.Arrays.fill(first, -1);
        int best = -1;
        for (int index = 0; index < s.length(); ++index) {
            int c = s.charAt(index) - 'a';
            if (first[c] == -1) {
                first[c] = index;
            } else {
                best = Math.max(best, index - first[c] - 1);
            }
        }
        return best;
    }
}
