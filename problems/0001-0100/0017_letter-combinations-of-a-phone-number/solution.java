import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] letterCombinations(String digits) {
        // 2..9 map to consecutive group slots; 1 and 0 have no letters.
        String[] groups = { "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz" };
        // Zero digits means zero combinations: [] (not [""]), and the walk
        // below must never start on an empty tree.
        if (digits.isEmpty()) {
            return new String[] {};
        }
        List<String> combinations = new ArrayList<>();
        walk(digits, groups, 0, new StringBuilder(), combinations);
        return combinations.toArray(new String[0]);
    }

    private void walk(String digits, String[] groups, int position, StringBuilder current, List<String> combinations) {
        // A leaf is a complete root-to-leaf path: one letter per digit.
        if (position == digits.length()) {
            combinations.add(current.toString());
            return;
        }
        String group = groups[digits.charAt(position) - '2'];
        // Visit letters in group order so earlier digits vary slowest.
        for (int i = 0; i < group.length(); ++i) {
            current.append(group.charAt(i));
            walk(digits, groups, position + 1, current, combinations);
            current.deleteCharAt(current.length() - 1);
        }
    }
}
