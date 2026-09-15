class Solution {
  public:
    string alphabetBoardPath(string target) {
        string out;
        int row = 0, col = 0;
        for (char ch : target) {
            int index = ch - 'a';
            // U then L then D then R: horizontal runs never happen inside
            // the truncated row 5, because L precedes the descent to 'z'
            // and U climbs away from 'z' before any R.
            int nrow = index / 5, ncol = index % 5;
            out.append(max(0, row - nrow), 'U');
            out.append(max(0, col - ncol), 'L');
            out.append(max(0, nrow - row), 'D');
            out.append(max(0, ncol - col), 'R');
            out.push_back('!');
            row = nrow;
            col = ncol;
        }
        return out;
    }
};
