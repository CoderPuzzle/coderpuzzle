import java.util.HashMap;
import java.util.Map;

class Solution {

    public int longestAwesome(String s) {
        // mask is a 10-bit number: bit d is 1 when digit d has appeared an
        // odd number of times in the prefix s[0:i+1]. firstSeen maps a
        // prefix mask to the smallest index that produced it (mask 0 maps
        // to -1, the empty prefix before the string starts). Two prefixes
        // sharing a mask cancel out to all-even digit counts between them
        // (already rearrangeable into a palindrome); two prefixes whose
        // masks differ in exactly one bit cancel to a single odd count
        // (the lone middle character of an odd-length palindrome).
        Map<Integer, Integer> firstSeen = new HashMap<>();
        firstSeen.put(0, -1);
        int mask = 0;
        int best = 0;
        for (int i = 0; i < s.length(); ++i) {
            mask ^= 1 << (s.charAt(i) - '0');
            Integer earlier = firstSeen.get(mask);
            if (earlier != null) {
                best = Math.max(best, i - earlier);
            } else {
                firstSeen.put(mask, i);
            }
            for (int digit = 0; digit < 10; ++digit) {
                Integer found = firstSeen.get(mask ^ (1 << digit));
                if (found != null) best = Math.max(best, i - found);
            }
        }
        return best;
    }
}
