class Solution {

    public boolean isDecomposable(String s) {
        // A run is a maximal block of equal digits. A run of length L must
        // split into 3-length pieces plus at most one 2-length piece, so
        // L % 3 is 0 (no 2) or 2 (one 2); L % 3 == 1 can never be split.
        int twos = 0;
        for (int i = 0; i < s.length(); ) {
            int j = i;
            while (j < s.length() && s.charAt(j) == s.charAt(i)) {
                j++;
            }
            int length = j - i;
            if (length % 3 == 1) {
                return false;
            }
            if (length % 3 == 2) {
                twos++;
                if (twos > 1) {
                    return false;
                }
            }
            i = j;
        }
        return twos == 1;
    }
}
