import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean differByOne(String[] words) {
        int n = words.length;
        if (n < 2) return false;
        int length = words[0].length();
        // Fix one position at a time; within that position, hash every word
        // with that single character masked out.
        for (int pos = 0; pos < length; ++pos) {
            Set<String> seen = new HashSet<>();
            for (String word : words) {
                String masked = word.substring(0, pos) + '*' + word.substring(pos + 1);
                // add() returns false on a repeat: two words agree everywhere
                // except pos, and uniqueness means they differ there and
                // nowhere else.
                if (!seen.add(masked)) return true;
            }
        }
        return false;
    }
}
