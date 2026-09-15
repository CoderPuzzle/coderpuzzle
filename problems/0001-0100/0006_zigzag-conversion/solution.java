class Solution {

    public String convert(String s, int numRows) {
        // One row never turns (the direction flag below could never flip),
        // and a grid taller than the text is a single pass down: either way
        // the zigzag is the string itself.
        if (numRows == 1 || numRows >= s.length()) {
            return s;
        }
        StringBuilder[] rows = new StringBuilder[numRows];
        for (int i = 0; i < numRows; i++) {
            rows[i] = new StringBuilder();
        }
        // Walk the string once, tracking the current row and direction;
        // reverse exactly at the top and bottom rows, where the zigzag turns.
        int index = 0,
            step = -1;
        for (int i = 0; i < s.length(); i++) {
            rows[index].append(s.charAt(i));
            if (index == 0) {
                step = 1;
            } else if (index == numRows - 1) {
                step = -1;
            }
            index += step;
        }
        // Reading the rows top to bottom is the conversion.
        StringBuilder result = new StringBuilder();
        for (StringBuilder row : rows) {
            result.append(row);
        }
        return result.toString();
    }
}
