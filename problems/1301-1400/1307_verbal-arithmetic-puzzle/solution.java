import java.util.HashMap;
import java.util.Map;

class Solution {

    private char[][] rows;
    private char[] target;
    private Map<Character, Integer> value = new HashMap<>();
    private boolean[] used = new boolean[10];
    private boolean[] leading = new boolean[26];

    public boolean isSolvable(String[] words, String result) {
        // Column-wise backtracking, mirroring hand addition: dfs(pos, row)
        // walks column pos of row `row`, accumulating a carry. Once every row
        // of the column is folded in, the sum's low digit must equal the
        // result letter's digit and the rest flows on as the new carry.
        boolean[] seen = new boolean[26];
        for (String word : words) {
            for (int i = 0; i < word.length(); ++i) seen[word.charAt(i) - 'A'] = true;
            leading[word.charAt(0) - 'A'] = true;
        }
        for (int i = 0; i < result.length(); ++i) seen[result.charAt(i) - 'A'] = true;
        leading[result.charAt(0) - 'A'] = true;
        int distinct = 0;
        for (boolean s : seen) if (s) ++distinct;
        if (distinct > 10) return false;

        rows = new char[words.length][];
        for (int i = 0; i < words.length; ++i) rows[i] = reverse(words[i]);
        target = reverse(result);
        int widest = 0;
        for (char[] row : rows) widest = Math.max(widest, row.length);
        // No leading zeros, so the sum is at least 10^(widest-1): the result
        // needs at least `widest` digits and at most widest + 1.
        if (target.length < widest || target.length > widest + 1) return false;
        return dfs(0, 0, 0);
    }

    private char[] reverse(String word) {
        char[] out = new char[word.length()];
        for (int i = 0; i < word.length(); ++i) out[i] = word.charAt(word.length() - 1 - i);
        return out;
    }

    private boolean dfs(int pos, int row, int carry) {
        if (pos == target.length) {
            return carry == 0;
        }
        if (row == rows.length) {
            // All rows folded: bind the result letter of this column.
            int digit = carry % 10;
            char ch = target[pos];
            Integer bound = value.get(ch);
            if (bound != null) {
                return bound == digit && dfs(pos + 1, 0, carry / 10);
            }
            if (used[digit] || (digit == 0 && leading[ch - 'A'])) return false;
            value.put(ch, digit);
            used[digit] = true;
            boolean ok = dfs(pos + 1, 0, carry / 10);
            if (!ok) {
                used[digit] = false;
                value.remove(ch);
            }
            return ok;
        }
        char ch = pos < rows[row].length ? rows[row][pos] : 0;
        if (ch == 0) return dfs(pos, row + 1, carry);
        Integer bound = value.get(ch);
        if (bound != null) return dfs(pos, row + 1, carry + bound);
        for (int digit = 0; digit < 10; ++digit) {
            if (used[digit] || (digit == 0 && leading[ch - 'A'])) continue;
            value.put(ch, digit);
            used[digit] = true;
            if (dfs(pos, row + 1, carry + digit)) return true;
            used[digit] = false;
            value.remove(ch);
        }
        return false;
    }
}
