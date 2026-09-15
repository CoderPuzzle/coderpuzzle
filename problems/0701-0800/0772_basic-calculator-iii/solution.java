class Solution {

    public int calculate(String s) {
        // Recursive descent over a dedicated thread with a large stack: deep
        // nesting is within the problem's constraints, but the judge's
        // default thread stack is not.
        final int[] result = new int[1];
        Thread worker = new Thread(null, () -> result[0] = (int) expr(s, new int[] { 0 }), "calculate", 1 << 26);
        worker.start();
        try {
            worker.join();
        } catch (InterruptedException error) {
            Thread.currentThread().interrupt();
            throw new RuntimeException(error);
        }
        return result[0];
    }

    private long expr(String s, int[] i) {
        long value = term(s, i);
        while (i[0] < s.length() && (s.charAt(i[0]) == '+' || s.charAt(i[0]) == '-')) {
            char op = s.charAt(i[0]);
            i[0]++;
            long rhs = term(s, i);
            value = op == '+' ? value + rhs : value - rhs;
        }
        return value;
    }

    private long term(String s, int[] i) {
        long value = factor(s, i);
        while (i[0] < s.length() && (s.charAt(i[0]) == '*' || s.charAt(i[0]) == '/')) {
            char op = s.charAt(i[0]);
            i[0]++;
            long rhs = factor(s, i);
            if (op == '*') {
                value *= rhs;
            } else {
                long quotient = Math.abs(value) / Math.abs(rhs);
                value = value < 0 == rhs < 0 ? quotient : -quotient;
            }
        }
        return value;
    }

    private long factor(String s, int[] i) {
        if (s.charAt(i[0]) == '(') {
            i[0]++;
            long value = expr(s, i);
            i[0]++; // closing ')'
            return value;
        }
        long value = 0;
        while (i[0] < s.length() && Character.isDigit(s.charAt(i[0]))) {
            value = value * 10 + (s.charAt(i[0]) - '0');
            i[0]++;
        }
        return value;
    }
}
