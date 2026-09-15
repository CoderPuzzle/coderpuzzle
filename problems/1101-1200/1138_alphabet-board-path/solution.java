class Solution {

    public String alphabetBoardPath(String target) {
        StringBuilder out = new StringBuilder();
        int row = 0,
            col = 0;
        for (int i = 0; i < target.length(); ++i) {
            int index = target.charAt(i) - 'a';
            // U then L then D then R: horizontal runs never happen inside
            // the truncated row 5, because L precedes the descent to 'z'
            // and U climbs away from 'z' before any R.
            int nrow = index / 5,
                ncol = index % 5;
            for (int k = row; k > nrow; --k) out.append('U');
            for (int k = col; k > ncol; --k) out.append('L');
            for (int k = row; k < nrow; ++k) out.append('D');
            for (int k = col; k < ncol; ++k) out.append('R');
            out.append('!');
            row = nrow;
            col = ncol;
        }
        return out.toString();
    }
}
