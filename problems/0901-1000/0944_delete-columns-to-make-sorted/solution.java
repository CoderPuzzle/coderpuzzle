class Solution {

    public int minDeletionSize(String[] strs) {
        int deletions = 0;
        int rows = strs.length,
            cols = strs[0].length();
        for (int j = 0; j < cols; j++) {
            for (int i = 1; i < rows; i++) {
                // A column is condemned the moment a character drops below
                // the one above it; equal characters never condemn.
                if (strs[i].charAt(j) < strs[i - 1].charAt(j)) {
                    deletions++;
                    break;
                }
            }
        }
        return deletions;
    }
}
