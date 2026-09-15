class Solution {

    public boolean validWordSquare(String[] words) {
        // A word square mirrors across its diagonal with absence counted:
        // the character at (i, j) demands a same-character mirror at
        // (j, i), so row j must exist at all and reach back to column i.
        int count = words.length;
        for (int i = 0; i < count; ++i) {
            String row = words[i];
            for (int j = 0; j < row.length(); ++j) {
                char ch = row.charAt(j);
                if (j >= count || i >= words[j].length() || words[j].charAt(i) != ch) {
                    return false;
                }
            }
        }
        return true;
    }
}
