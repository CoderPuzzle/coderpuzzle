class Solution {

    public int countValidPrefixes(String s) {
        // A prefix rearranges into an alternating string exactly when its counts
        // of '0' and '1' differ by at most one, so track both running counts
        // through one pass and count the prefixes whose balance stays within one.
        int zeros = 0;
        int ones = 0;
        int valid = 0;
        for (int i = 0; i < s.length(); ++i) {
            if (s.charAt(i) == '0') {
                zeros++;
            } else {
                ones++;
            }
            if (Math.abs(zeros - ones) <= 1) valid++;
        }
        return valid;
    }
}
