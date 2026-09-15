class Solution {

    public int numberOfSpecialChars(String word) {
        // A letter is special iff both of its cases occur somewhere; mark
        // the two 26-slot case flags in one pass, then count full pairs.
        boolean[] lower = new boolean[26];
        boolean[] upper = new boolean[26];
        for (int i = 0; i < word.length(); i++) {
            char ch = word.charAt(i);
            if (ch >= 'a') {
                lower[ch - 'a'] = true;
            } else {
                upper[ch - 'A'] = true;
            }
        }
        int count = 0;
        for (int k = 0; k < 26; k++) {
            if (lower[k] && upper[k]) {
                count++;
            }
        }
        return count;
    }
}
