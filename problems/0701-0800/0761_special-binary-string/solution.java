import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public String makeLargestSpecial(String s) {
        // A swap trades two adjacent special blocks, so the pieces that can
        // move are the top-level special substrings — mountains, each closed
        // exactly when the running count (+1 on '1', -1 on '0') returns to
        // zero. Maximize every mountain from the inside out: its inside is
        // itself special, because the count stays positive until the closing
        // '0', so recurse on the inside, re-wrap in the outer 1...0, and lay
        // the maximal mountains out largest-first.
        List<String> parts = new ArrayList<>();
        int count = 0;
        int start = 0;
        for (int i = 0; i < s.length(); i++) {
            count += s.charAt(i) == '1' ? 1 : -1;
            if (count == 0) {
                // The climb: the outer 1...0 goes on only after the inside
                // is maximal — "11011000" wraps its maximized inside
                // "110010" into "11100100".
                parts.add("1" + makeLargestSpecial(s.substring(start + 1, i)) + "0");
                start = i + 1;
            }
        }
        // Largest-first order is the largest concatenation of the fixed
        // maximal block set.
        parts.sort(Collections.reverseOrder());
        return String.join("", parts);
    }
}
