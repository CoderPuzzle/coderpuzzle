class Solution {

    public String solveEquation(String equation) {
        // Split at the one '=' and reduce each side to a*x + b with a single
        // scan. A term is an optional sign, digits (empty before an 'x' means
        // coefficient 1), and a possible trailing 'x'; '0x' contributes a zero
        // coefficient and drops out by itself.
        int eq = equation.indexOf('=');
        long[] left = parse(equation, 0, eq);
        long[] right = parse(equation, eq + 1, equation.length());
        // la*x + lb = ra*x + rb -> (la - ra)*x = rb - lb. A zero coefficient
        // leaves either every x or no x; otherwise the division is exact.
        long a = left[0] - right[0];
        long b = right[1] - left[1];
        if (a == 0) {
            return b == 0 ? "Infinite solutions" : "No solution";
        }
        return "x=" + b / a;
    }

    private long[] parse(String side, int from, int to) {
        long a = 0,
            b = 0;
        int i = from;
        while (i < to) {
            long sign = 1;
            char mark = side.charAt(i);
            if (mark == '+' || mark == '-') {
                sign = mark == '-' ? -1 : 1;
                i++;
            }
            long value = 0;
            boolean hasDigits = false;
            while (i < to && Character.isDigit(side.charAt(i))) {
                value = value * 10 + (side.charAt(i) - '0');
                hasDigits = true;
                i++;
            }
            if (i < to && side.charAt(i) == 'x') {
                a += sign * (hasDigits ? value : 1);
                i++;
            } else {
                b += sign * value;
            }
        }
        return new long[] { a, b };
    }
}
