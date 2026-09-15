import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    private static int[] combine(int[] a, int[] b, char op) {
        int va = a[0],
            ca = a[1];
        int vb = b[0],
            cb = b[1];
        int v, c;
        if (op == '&') {
            v = va & vb;
            if (v == 0) {
                if (va == 0 && vb == 0) {
                    c = Math.min(ca, cb) + 1;
                } else if (va == 0) {
                    // 0 & 1
                    c = Math.min(ca, 1);
                } else {
                    // 1 & 0
                    c = Math.min(cb, 1);
                }
            } else {
                // 1 & 1
                c = Math.min(ca, cb);
            }
        } else {
            // '|'
            v = va | vb;
            if (v == 0) {
                // 0 | 0 -> flip one operand to 1
                c = Math.min(ca, cb);
            } else if (va == 0) {
                // 0 | 1 -> flip b to 0 or switch to '&'
                c = Math.min(cb, 1);
            } else if (vb == 0) {
                // 1 | 0 -> flip a to 0 or switch to '&'
                c = Math.min(ca, 1);
            } else {
                // 1 | 1 -> both must become 0, or flip one and switch to '&'
                c = Math.min(ca, cb) + 1;
            }
        }
        return new int[] { v, c };
    }

    private static int[] evalSeq(List<int[]> values, List<Character> ops) {
        int[] result = values.get(0);
        for (int i = 0; i < ops.size(); i++) {
            result = combine(result, values.get(i + 1), ops.get(i));
        }
        return result;
    }

    public int minOperationsToFlip(String expression) {
        // stack item: op != 0 -> operator marker; otherwise val = [value, cost]
        Deque<Character> opStack = new ArrayDeque<>();
        Deque<int[]> valStack = new ArrayDeque<>();
        Deque<Boolean> isValStack = new ArrayDeque<>();
        for (int i = 0; i < expression.length(); i++) {
            char ch = expression.charAt(i);
            if (ch == '(') {
                opStack.push('(');
                isValStack.push(false);
            } else if (ch == '&' || ch == '|') {
                opStack.push(ch);
                isValStack.push(false);
            } else if (ch == '0' || ch == '1') {
                valStack.push(new int[] { ch - '0', 1 });
                isValStack.push(true);
            } else {
                // ')'
                List<int[]> values = new ArrayList<>();
                List<Character> ops = new ArrayList<>();
                while (!isValStack.isEmpty() && !(isValStack.peek() == false && opStack.peek() == '(')) {
                    boolean isVal = isValStack.pop();
                    if (isVal) {
                        values.add(valStack.pop());
                    } else {
                        ops.add(opStack.pop());
                    }
                }
                isValStack.pop();
                opStack.pop(); // remove '('
                // values and ops were collected in reverse order; restore original order
                for (int l = 0, r = values.size() - 1; l < r; l++, r--) {
                    int[] tmp = values.get(l);
                    values.set(l, values.get(r));
                    values.set(r, tmp);
                }
                for (int l = 0, r = ops.size() - 1; l < r; l++, r--) {
                    char tmp = ops.get(l);
                    ops.set(l, ops.get(r));
                    ops.set(r, tmp);
                }
                valStack.push(evalSeq(values, ops));
                isValStack.push(true);
            }
        }
        List<int[]> values = new ArrayList<>();
        List<Character> ops = new ArrayList<>();
        while (!isValStack.isEmpty()) {
            boolean isVal = isValStack.pollLast();
            if (isVal) {
                values.add(valStack.pollLast());
            } else {
                ops.add(opStack.pollLast());
            }
        }
        return evalSeq(values, ops)[1];
    }
}
