import java.util.HashMap;
import java.util.Map;

class Solution {

    public int lengthOfLongestSubstringTwoDistinct(String s) {
        // Sliding window with a character count map. The map never holds more
        // than two entries, so the window is always a valid substring and the
        // answer is simply the largest width it ever reaches.
        Map<Character, Integer> counts = new HashMap<>();
        int best = 0;
        int left = 0;
        for (int right = 0; right < s.length(); ++right) {
            char ch = s.charAt(right);
            counts.merge(ch, 1, Integer::sum);
            // A third distinct character broke the rule: shrink from the left
            // until one character's count drains to zero and leaves the map.
            while (counts.size() > 2) {
                char leftmost = s.charAt(left);
                counts.merge(leftmost, -1, Integer::sum);
                counts.remove(leftmost, 0);
                ++left;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
