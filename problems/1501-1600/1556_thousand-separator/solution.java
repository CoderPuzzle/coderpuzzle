class Solution {

    public String thousandSeparator(int n) {
        // Reverse the digit string, cut it into runs of three, join with
        // '.', then reverse back — the chunk boundaries land exactly on
        // multiples of three counted from the units digit.
        String digits = new StringBuilder(Integer.toString(n)).reverse().toString();
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < digits.length(); i += 3) {
            if (i > 0) {
                result.append('.');
            }
            result.append(digits, i, Math.min(i + 3, digits.length()));
        }
        return result.reverse().toString();
    }
}
