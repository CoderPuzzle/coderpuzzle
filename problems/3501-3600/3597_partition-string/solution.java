import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public List<String> partitionString(String s) {
        // Greedy replay of the procedure: grow the current segment one
        // character at a time and emit it the first moment it is not in the
        // seen set, then start a new segment at the next index. A tail that
        // reaches the end of s while still seen is never emitted — the loop
        // simply ends (Example 2's final "a" is dropped).
        List<String> segments = new ArrayList<>();
        Set<String> seen = new HashSet<>();
        int start = 0;
        for (int stop = 1; stop <= s.length(); ++stop) {
            String candidate = s.substring(start, stop);
            if (seen.add(candidate)) {
                segments.add(candidate);
                start = stop;
            }
        }
        return segments;
    }
}
