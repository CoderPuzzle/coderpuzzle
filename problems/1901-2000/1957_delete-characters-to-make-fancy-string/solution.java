class Solution {

    public String makeFancyString(String s) {
        // Greedy append: keep s[i] unless it would extend a run of three.
        // Runs of a repeated character are independent, so truncating every
        // maximal run to two chars is both minimal (every extra char beyond
        // two in a run must be deleted) and the unique answer.
        StringBuilder res = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            int n = res.length();
            if (n >= 2 && res.charAt(n - 1) == c && res.charAt(n - 2) == c) {
                continue;
            }
            res.append(c);
        }
        return res.toString();
    }
}
