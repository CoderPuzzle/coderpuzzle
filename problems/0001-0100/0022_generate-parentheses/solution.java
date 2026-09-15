class Solution {

    public String[] generateParenthesis(int n) {
        java.util.List<String> result = new java.util.ArrayList<>();
        backtrack(n, new StringBuilder(), 0, 0, result);
        return result.toArray(new String[0]);
    }

    private void backtrack(int n, StringBuilder current, int openCount, int closeCount, java.util.List<String> result) {
        // Under the two guards below every leaf reached at length 2n is
        // well-formed by construction, so nothing needs re-validating.
        if (current.length() == 2 * n) {
            result.add(current.toString());
            return;
        }
        // Try '(' first ('(' < ')') so leaves emerge in lexicographic order;
        // it is allowed while fewer than n openings are placed.
        if (openCount < n) {
            // Append, recurse, delete: one shared builder is the working
            // storage for the whole tree.
            current.append('(');
            backtrack(n, current, openCount + 1, closeCount, result);
            current.deleteCharAt(current.length() - 1);
        }
        // ')' only while closings still trail openings -- appending it can
        // never make the prefix invalid.
        if (closeCount < openCount) {
            current.append(')');
            backtrack(n, current, openCount, closeCount + 1, result);
            current.deleteCharAt(current.length() - 1);
        }
    }
}
