class Solution {

    public String intToRoman(int num) {
        // Folding the six subtractive forms into the value table and sorting
        // it descending makes plain greed exact: the largest value that fits
        // is always the symbol the decimal-place rules would pick.
        int[] values = { 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 };
        String[] symbols = { "M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I" };
        StringBuilder result = new StringBuilder();
        // Each value is consumed at most three times, so the walk is bounded
        // by the table, not by num.
        for (int i = 0; i < values.length; ++i) {
            while (num >= values[i]) {
                result.append(symbols[i]);
                num -= values[i];
            }
        }
        return result.toString();
    }
}
