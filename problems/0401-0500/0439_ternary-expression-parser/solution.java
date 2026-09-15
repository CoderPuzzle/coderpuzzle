import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public String parseTernary(String expression) {
        // Ternaries group right-to-left, so the subexpression closest to the
        // right end is always complete first. Scanning backwards therefore
        // meets every operand before the '?' that needs it.
        Deque<Character> stack = new ArrayDeque<>();
        for (int i = expression.length() - 1; i >= 0; i--) {
            char c = expression.charAt(i);
            if (c != '?') {
                stack.push(c);
            } else {
                char trueBranch = stack.pop();
                stack.pop(); // the ':' separating the two branches
                char falseBranch = stack.pop();
                // The character just left of the '?' is the condition ('T' or
                // 'F'); it belongs to this conditional, so consume it as well.
                char condition = expression.charAt(--i);
                stack.push(condition == 'T' ? trueBranch : falseBranch);
            }
        }
        return String.valueOf(stack.pop());
    }
}
