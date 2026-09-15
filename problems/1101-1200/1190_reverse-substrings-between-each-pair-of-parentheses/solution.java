import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public String reverseParentheses(String s) {
        // fragment stack mirrors the parenthesis nesting; the base fragment
        // is the outermost level and ends up holding the answer
        Deque<StringBuilder> stack = new ArrayDeque<>();
        stack.push(new StringBuilder());
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '(') {
                // open a fresh fragment for the new nesting level
                stack.push(new StringBuilder());
            } else if (ch == ')') {
                // matching pair complete: reverse the finished fragment and
                // fold it into the level below — reversal composes with nesting
                StringBuilder top = stack.pop();
                top.reverse();
                stack.peek().append(top);
            } else {
                // letters accumulate in the innermost current fragment
                stack.peek().append(ch);
            }
        }
        return stack.pop().toString();
    }
}
