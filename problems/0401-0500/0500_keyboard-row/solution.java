import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] findWords(String[] words) {
        // One table from each letter to its keyboard row 0, 1 or 2, built once
        // from the three row listings: both cases of a letter land in the same
        // bucket, which is the whole case-insensitivity story.
        int[] rowOf = new int[128];
        String[] rows = { "qwertyuiop", "asdfghjkl", "zxcvbnm" };
        for (int row = 0; row < rows.length; ++row) {
            for (char ch : rows[row].toCharArray()) {
                rowOf[ch] = row;
                rowOf[Character.toUpperCase(ch)] = row;
            }
        }
        List<String> result = new ArrayList<>();
        for (String word : words) {
            // A word is typeable on one row iff no letter ever leaves the row
            // its first letter already fixed; the word keeps its own casing.
            int firstRow = rowOf[word.charAt(0)];
            boolean oneRow = true;
            for (char ch : word.toCharArray()) {
                if (rowOf[ch] != firstRow) {
                    oneRow = false;
                    break;
                }
            }
            if (oneRow) {
                result.add(word);
            }
        }
        return result.toArray(new String[0]);
    }
}
