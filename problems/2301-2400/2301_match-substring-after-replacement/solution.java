import java.math.BigInteger;

class Solution {

    public boolean matchReplacement(String s, String sub, String[][] mappings) {
        // base[t] marks every position of s holding character t; matched[old]
        // extends it with the positions each declared target covers, so bit p
        // of matched[old] is exactly matched(old, s[p]).
        BigInteger[] base = new BigInteger[128];
        for (int t = 0; t < 128; t++) {
            base[t] = BigInteger.ZERO;
        }
        for (int p = 0; p < s.length(); p++) {
            int t = s.charAt(p);
            base[t] = base[t].setBit(p);
        }
        BigInteger[] matched = base.clone();
        for (String[] pair : mappings) {
            int old = pair[0].charAt(0),
                nw = pair[1].charAt(0);
            matched[old] = matched[old].or(base[nw]);
        }
        // bit e of seen marks a window whose first j + 1 characters all match
        // and that ends at e. Seed with the first character's mask; every
        // later character grows the survivors one position deeper into s.
        BigInteger seen = matched[sub.charAt(0)];
        for (int j = 1; j < sub.length(); j++) {
            seen = seen.shiftLeft(1).and(matched[sub.charAt(j)]);
        }
        return seen.signum() > 0;
    }
}
