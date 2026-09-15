class Solution {

    public String removeOuterParentheses(String s) {
        StringBuilder result = new StringBuilder();
        int depth = 0;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '(') {
                // Keep it only if some other primitive block is already
                // open; an outermost '(' opens at depth 0 and is dropped.
                if (depth > 0) {
                    result.append(ch);
                }
                depth++;
            } else {
                // Close the block first, then keep the character only if
                // it did not just bring the depth back to 0.
                depth--;
                if (depth > 0) {
                    result.append(ch);
                }
            }
        }
        return result.toString();
    }
}
