class Solution {
  public:
    string convert(string s, int numRows) {
        // One row never turns (the direction flag below could never flip),
        // and a grid taller than the text is a single pass down: either way
        // the zigzag is the string itself.
        if (numRows == 1 || numRows >= (int)s.size()) {
            return s;
        }
        vector<string> rows(numRows);
        // Walk the string once, tracking the current row and direction;
        // reverse exactly at the top and bottom rows, where the zigzag turns.
        int index = 0, step = -1;
        for (char ch : s) {
            rows[index] += ch;
            if (index == 0) {
                step = 1;
            } else if (index == numRows - 1) {
                step = -1;
            }
            index += step;
        }
        // Reading the rows top to bottom is the conversion.
        string result;
        for (const string &row : rows) {
            result += row;
        }
        return result;
    }
};
