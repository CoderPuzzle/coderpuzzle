class Solution {

    public int minDeletionSize(String[] strs) {
        int deletions = 0;
        int rows = strs.length,
            cols = strs[0].length();
        // cut[i]: rows i and i + 1 are already strictly ordered on the kept
        // prefix, so later columns no longer constrain that pair.
        boolean[] cut = new boolean[rows - 1];
        for (int j = 0; j < cols; j++) {
            boolean bad = false;
            for (int i = 0; i < rows - 1; i++) {
                if (!cut[i] && strs[i].charAt(j) > strs[i + 1].charAt(j)) {
                    // A still-undecided pair drops here: the column must go.
                    bad = true;
                    break;
                }
            }
            if (bad) {
                deletions++;
                continue;
            }
            for (int i = 0; i < rows - 1; i++) {
                if (!cut[i] && strs[i].charAt(j) < strs[i + 1].charAt(j)) {
                    // A strict rise settles the pair for every later column.
                    cut[i] = true;
                }
            }
        }
        return deletions;
    }
}
