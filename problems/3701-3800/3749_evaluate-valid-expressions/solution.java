class Solution {

    // Intermediate values reach ~2^62, so the whole pipeline is 64-bit.
    public long evaluateExpression(String expression) {
        int[] pos = { 0 };
        return parse(expression, pos);
    }

    // One recursive descent covers the grammar; each call returns the value
    // and leaves pos just past what it consumed.
    private long parse(String expr, int[] pos) {
        char ch = expr.charAt(pos[0]);
        // A digit or '-' starts a literal: optional sign, then digits.
        if (ch == '-' || (ch >= '0' && ch <= '9')) {
            int i = pos[0];
            int j = ch == '-' ? i + 1 : i;
            while (j < expr.length() && expr.charAt(j) >= '0' && expr.charAt(j) <= '9') {
                j++;
            }
            pos[0] = j;
            return Long.parseLong(expr.substring(i, j));
        }
        // Otherwise a three-letter operator; +=4 lands just past "op(".
        String op = expr.substring(pos[0], pos[0] + 3);
        pos[0] += 4;
        long a = parse(expr, pos);
        pos[0]++; // skip ","
        long b = parse(expr, pos);
        pos[0]++; // skip ")"
        // Apply the operator to the two sub-results as the recursion unwinds.
        switch (op) {
            case "add":
                return a + b;
            case "sub":
                return a - b;
            case "mul":
                return a * b;
            default:
                return a / b;
        }
    }
}
