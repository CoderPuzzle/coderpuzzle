class Solution {

    public String mergeAlternately(String word1, String word2) {
        // One pointer per word: emit alternately while both words still
        // have characters, then append whichever tail remains.
        StringBuilder out = new StringBuilder(word1.length() + word2.length());
        int i = 0;
        int j = 0;
        while (i < word1.length() && j < word2.length()) {
            out.append(word1.charAt(i));
            out.append(word2.charAt(j));
            i++;
            j++;
        }
        out.append(word1, i, word1.length());
        out.append(word2, j, word2.length());
        return out.toString();
    }
}
