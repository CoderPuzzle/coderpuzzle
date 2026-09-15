import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int evalRPN(String[] tokens) {
        // Stack machine: operands wait on the stack until an operator arrives,
        // pops its two operands -- the second pop is the left one -- and pushes
        // the result of applying itself.
        Deque<Long> stack = new ArrayDeque<>();
        for (String token : tokens) {
            if (token.equals("+") || token.equals("-") || token.equals("*") || token.equals("/")) {
                long b = stack.pop();
                long a = stack.pop();
                if (token.equals("+")) {
                    stack.push(a + b);
                } else if (token.equals("-")) {
                    stack.push(a - b);
                } else if (token.equals("*")) {
                    stack.push(a * b);
                } else {
                    // Java's integer division already truncates toward zero.
                    stack.push(a / b);
                }
            } else {
                stack.push(Long.parseLong(token));
            }
        }
        return stack.pop().intValue();
    }
}
