import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            // Openers are pushed: the most recently opened bracket is always
            // the one that must close next -- a LIFO discipline the stack
            // models directly.
            if (ch == '(' || ch == '[' || ch == '{') {
                stack.push(ch);
            } else {
                // Map the closer to the opener it requires.
                char open = ch == ')' ? '(' : ch == ']' ? '[' : '{';
                // One combined test: an empty stack means nothing is open, so
                // the closer is unmatched, and the pop doubles as the match
                // check against that required opener.
                if (stack.isEmpty() || stack.pop() != open) {
                    return false;
                }
            }
        }
        // Valid exactly when nothing is left open; catches inputs like "(((".
        return stack.isEmpty();
    }
}
