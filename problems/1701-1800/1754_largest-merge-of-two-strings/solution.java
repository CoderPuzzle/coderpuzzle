class Solution {

    public String largestMerge(String word1, String word2) {
        // Take the next character from whichever REMAINING string is
        // lexicographically larger — the suffix comparison settles not
        // just differing heads but the tie case.
        StringBuilder out = new StringBuilder();
        int i = 0,
            j = 0;
        int n = word1.length(),
            m = word2.length();
        while (i < n && j < m) {
            if (word1.substring(i).compareTo(word2.substring(j)) > 0) {
                out.append(word1.charAt(i));
                i++;
            } else {
                out.append(word2.charAt(j));
                j++;
            }
        }
        out.append(word1, i, n);
        out.append(word2, j, m);
        return out.toString();
    }
}
