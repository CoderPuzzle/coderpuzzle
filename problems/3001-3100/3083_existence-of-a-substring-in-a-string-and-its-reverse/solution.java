import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean isSubstringPresent(String s) {
        // A length-2 substring of s shows up in reverse(s) exactly when its
        // own reversal shows up somewhere in s, since reading s backwards
        // turns every adjacent pair xy into yx. One pass records each pair
        // in a set and looks the current pair up flipped — a hit on yx
        // means an earlier xy mirrors into it, and a later yx finds the xy
        // recorded before it. A doubled letter is its own reversal, so xx
        // matches the moment it appears.
        Set<String> seen = new HashSet<>();
        for (int i = 0; i + 1 < s.length(); i++) {
            String pair = s.substring(i, i + 2);
            if (s.charAt(i) == s.charAt(i + 1) || seen.contains(s.substring(i + 1, i + 2) + s.substring(i, i + 1))) {
                return true;
            }
            seen.add(pair);
        }
        return false;
    }
}
