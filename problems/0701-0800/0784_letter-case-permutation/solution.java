import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] letterCasePermutation(String s) {
        // Interleaved list-doubling: scan s left to right; at each letter
        // every string built so far is immediately followed by its copy
        // with that one letter's case flipped.
        List<String> result = new ArrayList<>();
        result.add(s);
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            boolean letter = (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
            if (!letter) {
                continue;
            }
            char flipped = (char) (ch ^ 0x20);
            List<String> grown = new ArrayList<>(result.size() * 2);
            for (String current : result) {
                grown.add(current);
                grown.add(current.substring(0, i) + flipped + current.substring(i + 1));
            }
            result = grown;
        }
        return result.toArray(new String[0]);
    }
}
