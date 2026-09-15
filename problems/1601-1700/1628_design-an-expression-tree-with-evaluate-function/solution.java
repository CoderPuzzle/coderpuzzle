class Solution {

    public long buildAndEvaluate(String[] postfix) {
        long[] stack = new long[postfix.length];
        int top = -1;
        for (String tok : postfix) {
            if (tok.equals("+") || tok.equals("-") || tok.equals("*") || tok.equals("/")) {
                long b = stack[top--];
                long a = stack[top--];
                long value;
                switch (tok) {
                    case "+":
                        value = a + b;
                        break;
                    case "-":
                        value = a - b;
                        break;
                    case "*":
                        value = a * b;
                        break;
                    default:
                        value = a / b; // Java's / truncates toward zero.
                        break;
                }
                stack[++top] = value;
            } else {
                stack[++top] = Long.parseLong(tok);
            }
        }
        return stack[top];
    }
}
