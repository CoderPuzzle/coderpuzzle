class Solution {

    public String addBoldTag(String s, String[] words) {
        // Every occurrence of every word paints its half-open interval onto a
        // boolean mask. Painting overlapping AND adjacent intervals onto one
        // mask merges them exactly as the two tag rules demand, so no interval
        // bookkeeping is needed. Each word is located by find-restart —
        // search again from one past every hit — because a single
        // non-restarting search would consume the overlapping occurrences
        // ("aa" inside "aaa" at both 0 and 1).
        int n = s.length();
        boolean[] bold = new boolean[n];
        for (String word : words) {
            int length = word.length();
            for (int start = s.indexOf(word); start != -1; start = s.indexOf(word, start + 1)) {
                for (int j = start; j < start + length; ++j) {
                    bold[j] = true;
                }
            }
        }
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < n; ++i) {
            if (bold[i] && (i == 0 || !bold[i - 1])) {
                result.append("<b>");
            }
            result.append(s.charAt(i));
            if (bold[i] && (i == n - 1 || !bold[i + 1])) {
                result.append("</b>");
            }
        }
        return result.toString();
    }
}
