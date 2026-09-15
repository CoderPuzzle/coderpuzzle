class Solution {

    public int longestValidParentheses(String s) {
        // Array-based index stack (room for the base plus every index);
        // seeded with -1, a sentinel base marking the position just before
        // the current candidate stretch.
        int[] stack = new int[s.length() + 1];
        int top = 0;
        stack[top++] = -1;
        int best = 0;
        for (int i = 0; i < s.length(); i++) {
            // Every '(' index is pushed, so the stack holds the still-
            // unmatched openers in order, with the base beneath them.
            if (s.charAt(i) == '(') {
                stack[top++] = i;
            } else {
                top--;
                if (top == 0) {
                    // The pop emptied the stack: this ')' is unmatched and
                    // can never sit inside a valid substring, so its index
                    // becomes the new base, fencing off everything to its
                    // left.
                    stack[top++] = i;
                } else {
                    // The popped index was the '(' matching this ')'. The top
                    // now names the closest barrier before the stretch ending
                    // here, so i - stack[top - 1] is its full length;
                    // barriers only disappear by being matched, so "()()"
                    // measures 4, not 2.
                    if (i - stack[top - 1] > best) {
                        best = i - stack[top - 1];
                    }
                }
            }
        }
        return best;
    }
}
