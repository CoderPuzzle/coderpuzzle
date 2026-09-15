import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean isIsomorphic(String s, String t) {
        // The contract is symmetric and names its own data structure: every
        // character of s keeps one consistent replacement (forward), and no
        // two characters share a replacement (reverse). Each clause is one
        // map, enforced together in a single order-preserving pass.
        if (s.length() != t.length()) return false;
        Map<Character, Character> forward = new HashMap<>();
        Map<Character, Character> reverse = new HashMap<>();
        for (int index = 0; index < s.length(); ++index) {
            char sChar = s.charAt(index),
                tChar = t.charAt(index);
            // One branch per contract clause: a source already bound to a
            // different replacement, or a target already claimed by another source.
            if (forward.containsKey(sChar) && forward.get(sChar) != tChar) return false;
            if (reverse.containsKey(tChar) && reverse.get(tChar) != sChar) return false;
            forward.put(sChar, tChar);
            reverse.put(tChar, sChar);
        }
        return true;
    }
}
