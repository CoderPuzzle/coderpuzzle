class Solution {

    public int countMatches(String[][] items, String ruleKey, String ruleValue) {
        // The three rule keys are exactly the three columns of every item,
        // so the key resolves once to a column index and the loop below
        // compares one fixed field of each row.
        int index = columnIndex(ruleKey);
        int matches = 0;
        for (String[] item : items) {
            if (item[index].equals(ruleValue)) {
                matches++;
            }
        }
        return matches;
    }

    // "type" is column 0, "color" column 1, "name" column 2.
    private static int columnIndex(String ruleKey) {
        if (ruleKey.equals("type")) return 0;
        if (ruleKey.equals("color")) return 1;
        return 2;
    }
}
