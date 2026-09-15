import java.util.*;

class Solution {

    public int wordCount(String[] startWords, String[] targetWords) {
        HashSet<Integer> starts = new HashSet<>();
        for (String w : startWords) {
            starts.add(mask(w));
        }
        int count = 0;
        for (String t : targetWords) {
            int m = mask(t);
            // A target is obtainable iff its mask is a start mask plus one
            // extra bit; clearing each set bit tests exactly that inverse.
            // Same-mask words never count — exactly one letter is appended.
            for (int bit = 0; bit < 26; bit++) {
                if ((m & (1 << bit)) != 0 && starts.contains(m ^ (1 << bit))) {
                    count++;
                    break;
                }
            }
        }
        return count;
    }

    private int mask(String w) {
        // No letter repeats, so a word is fully described by the 26-bit
        // mask of letters it contains.
        int m = 0;
        for (int i = 0; i < w.length(); i++) {
            m |= 1 << (w.charAt(i) - 'a');
        }
        return m;
    }
}
