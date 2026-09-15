class Solution {

    public String longestCommonPrefix(String[] strs) {
        // The prefix cannot outlive the shortest string, so scanning column
        // by column stops exactly at the first position any string disagrees
        // on or ends.
        String first = strs[0];
        for (int column = 0; column < first.length(); column++) {
            char ch = first.charAt(column);
            // A shorter string ending here is as final as a mismatch:
            // nothing can extend the prefix past its last character.
            for (int i = 1; i < strs.length; i++) {
                String s = strs[i];
                if (column == s.length() || s.charAt(column) != ch) {
                    return first.substring(0, column);
                }
            }
        }
        // Every column of the first string survived every other string.
        return first;
    }
}
