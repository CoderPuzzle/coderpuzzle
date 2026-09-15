class Solution {

    public boolean isOneEditDistance(String s, String t) {
        // Swap so s is the shorter (or equal) string: a delete on one side
        // is an insert on the other, so one orientation covers both.
        if (s.length() > t.length()) {
            String longer = s;
            s = t;
            t = longer;
        }
        if (t.length() - s.length() > 1) {
            // No single edit changes the length by more than one.
            return false;
        }
        for (int i = 0; i < s.length(); ++i) {
            if (s.charAt(i) != t.charAt(i)) {
                if (s.length() == t.length()) {
                    // Replace: both tails after the first divergence must agree.
                    return s.substring(i + 1).equals(t.substring(i + 1));
                }
                // Insert t.charAt(i) into s: s from here must match t from the next slot.
                return s.substring(i).equals(t.substring(i + 1));
            }
        }
        // s is a prefix of t: identical strings are zero edits apart, so exactly
        // one edit remains only if t has one character more.
        return t.length() - s.length() == 1;
    }
}
