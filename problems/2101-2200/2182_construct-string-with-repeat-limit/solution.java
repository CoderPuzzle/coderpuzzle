class Solution {

    public String repeatLimitedString(String s, int repeatLimit) {
        // Greedy: always emit the largest letter still available; when it
        // exhausts its allowed run, spend one unit of the next largest as
        // a separator, then resume.
        int[] counts = new int[26];
        for (int index = 0; index < s.length(); ++index) {
            ++counts[s.charAt(index) - 'a'];
        }
        StringBuilder out = new StringBuilder(s.length());
        int i = 25;
        while (true) {
            while (i >= 0 && counts[i] == 0) {
                --i;
            }
            if (i < 0) {
                break;
            }
            int run = Math.min(repeatLimit, counts[i]);
            for (int k = 0; k < run; ++k) {
                out.append((char) ('a' + i));
            }
            counts[i] -= run;
            if (counts[i] == 0) {
                continue;
            }
            int j = i - 1;
            while (j >= 0 && counts[j] == 0) {
                --j;
            }
            if (j < 0) {
                break;
            }
            out.append((char) ('a' + j));
            --counts[j];
        }
        return out.toString();
    }
}
