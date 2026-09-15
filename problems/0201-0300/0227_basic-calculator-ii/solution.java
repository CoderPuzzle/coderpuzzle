import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int calculate(String s) {
        // The expression is a plain sum of terms, each term a maximal chain
        // of */ : defer the additions and apply the operator that PRECEDED
        // the number just read, keeping fully evaluated terms on a stack.
        Deque<Long> stack = new ArrayDeque<>();
        long num = 0;
        char op = '+';
        int last = s.length() - 1;
        for (int i = 0; i <= last; i++) {
            char ch = s.charAt(i);
            if (ch >= '0' && ch <= '9') {
                num = num * 10 + (ch - '0');
            }
            // Two separate ifs: a digit in the last position must both extend
            // num and trigger the final flush (else-if would drop the term).
            if (ch == '+' || ch == '-' || ch == '*' || ch == '/' || i == last) {
                switch (op) {
                    case '+':
                        stack.push(num);
                        break;
                    case '-':
                        stack.push(-num);
                        break;
                    case '*':
                        // */ combines with the term currently on top.
                        stack.push(stack.pop() * num);
                        break;
                    default:
                        stack.push(stack.pop() / num);
                }
                op = ch;
                num = 0;
            }
        }
        // The answer is the sum of the deferred terms.
        long total = 0;
        for (long value : stack) {
            total += value;
        }
        return (int) total;
    }
}
