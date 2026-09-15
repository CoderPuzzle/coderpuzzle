class Solution {

    private String s;
    private int pos;

    public long buildAndEvaluate(String s) {
        this.s = s;
        this.pos = 0;
        return parseExpr();
    }

    private long parseExpr() {
        long value = parseTerm();
        while (pos < s.length() && (s.charAt(pos) == '+' || s.charAt(pos) == '-')) {
            char op = s.charAt(pos);
            pos++;
            long rhs = parseTerm();
            value = op == '+' ? value + rhs : value - rhs;
        }
        return value;
    }

    private long parseTerm() {
        long value = parseFactor();
        while (pos < s.length() && (s.charAt(pos) == '*' || s.charAt(pos) == '/')) {
            char op = s.charAt(pos);
            pos++;
            long rhs = parseFactor();
            value = op == '*' ? value * rhs : value / rhs;
        }
        return value;
    }

    private long parseFactor() {
        if (s.charAt(pos) == '(') {
            pos++;
            long value = parseExpr();
            pos++; // skip ')'
            return value;
        }
        long value = s.charAt(pos) - '0';
        pos++;
        return value;
    }
}
