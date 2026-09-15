class Solution {

    public String minimizeResult(String expression) {
        int plus = expression.indexOf('+');
        String left = expression.substring(0, plus);
        String right = expression.substring(plus + 1);
        long bestValue = Long.MAX_VALUE;
        String bestForm = "";
        for (int i = 0; i < left.length(); i++) {
            long outerLeft = i > 0 ? Long.parseLong(left.substring(0, i)) : 1;
            long innerLeft = Long.parseLong(left.substring(i));
            for (int j = 1; j <= right.length(); j++) {
                long innerRight = Long.parseLong(right.substring(0, j));
                long outerRight = j < right.length() ? Long.parseLong(right.substring(j)) : 1;
                long value = outerLeft * (innerLeft + innerRight) * outerRight;
                if (value < bestValue) {
                    bestValue = value;
                    bestForm =
                        left.substring(0, i) +
                        "(" +
                        left.substring(i) +
                        "+" +
                        right.substring(0, j) +
                        ")" +
                        right.substring(j);
                }
            }
        }
        return bestForm;
    }
}
