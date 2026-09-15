class Solution {

    public int maxDepth(String s) {
        // s is guaranteed to be a VPS, so a running depth counter suffices:
        // '(' increments it, ')' decrements it, everything else is skipped.
        int depth = 0;
        int best = 0;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '(') {
                depth++;
                best = Math.max(best, depth);
            } else if (ch == ')') {
                depth--;
            }
        }
        return best;
    }
}
