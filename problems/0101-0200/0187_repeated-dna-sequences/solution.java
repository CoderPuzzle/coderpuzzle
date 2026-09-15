import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public String[] findRepeatedDnaSequences(String s) {
        Set<String> seen = new HashSet<>();
        // A second set collects each repeated window exactly once, even when
        // it occurs three or more times.
        Set<String> repeated = new HashSet<>();
        // Slide a fixed 10-letter window; the loop bound yields no full
        // window (hence an empty result) for strings shorter than 10.
        for (int i = 0; i + 10 <= s.length(); i++) {
            String seq = s.substring(i, i + 10);
            // add() returns false when the window was already seen, i.e. it
            // occurs at least twice.
            if (!seen.add(seq)) {
                repeated.add(seq);
            }
        }
        // Sorted output for a deterministic order.
        String[] result = repeated.toArray(new String[0]);
        Arrays.sort(result);
        return result;
    }
}
