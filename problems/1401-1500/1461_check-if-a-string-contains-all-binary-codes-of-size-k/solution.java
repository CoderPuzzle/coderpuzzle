import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean hasAllCodes(String s, int k) {
        // all 2^k codes present <=> distinct length-k substrings reach 2^k;
        // a string shorter than k cannot host even one code of length k
        int need = 1 << k;
        if (s.length() < k) return false;
        Set<String> seen = new HashSet<>();
        for (int i = 0; i + k <= s.length(); i++) {
            seen.add(s.substring(i, i + k));
            // early exit: codes exhausted before the string ends
            if (seen.size() == need) return true;
        }
        return seen.size() == need;
    }
}
