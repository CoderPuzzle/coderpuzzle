class Solution {

    public boolean areAlmostEqual(String s1, String s2) {
        // One swap repairs exactly two positions, and only when their
        // characters are crossed between the two strings.
        int i = -1;
        int j = -1;
        for (int k = 0; k < s1.length(); k++) {
            if (s1.charAt(k) != s2.charAt(k)) {
                if (i == -1) {
                    i = k;
                } else if (j == -1) {
                    j = k;
                } else {
                    return false;
                }
            }
        }
        if (j == -1) {
            return i == -1;
        }
        return s1.charAt(i) == s2.charAt(j) && s1.charAt(j) == s2.charAt(i);
    }
}
