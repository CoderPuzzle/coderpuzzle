class Solution {

    // One pass tracks the current run; each character's best run is
    // folded in on change and once more after the loop. A digit that
    // never appears keeps its best at 0, per the statement's rule.
    public boolean checkZeroOnes(String s) {
        int[] best = new int[2];
        char prev = ' ';
        int cur = 0;
        for (int i = 0; i <= s.length(); i++) {
            char ch = i < s.length() ? s.charAt(i) : ' ';
            if (ch == prev) {
                cur++;
            } else {
                if (prev == '0' || prev == '1') {
                    best[prev - '0'] = Math.max(best[prev - '0'], cur);
                }
                cur = 1;
                prev = ch;
            }
        }
        return best[1] > best[0];
    }
}
