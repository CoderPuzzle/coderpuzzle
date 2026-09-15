import java.util.HashMap;
import java.util.Map;

class Solution {

    public int getMaxRepetitions(String s1, int n1, String s2, int n2) {
        // Walk str1 one s1-block at a time. The only state crossing a block
        // boundary is the cursor into s2 plus the copies consumed so far, and
        // the cursor alone decides how any later block plays out — so a
        // repeated cursor exposes a cycle that can be jumped arithmetically.
        Map<Integer, int[]> seen = new HashMap<>();
        int cursor = 0;
        int copies = 0;
        int blocks = 0;
        while (blocks < n1) {
            for (int i = 0; i < s1.length(); ++i) {
                if (s1.charAt(i) == s2.charAt(cursor)) {
                    cursor++;
                    if (cursor == s2.length()) {
                        cursor = 0;
                        copies++;
                    }
                }
            }
            blocks++;
            int[] start = seen.get(cursor);
            if (start != null) {
                // Every (blocks - start[0]) blocks add (copies - start[1])
                // more copies; take as many whole cycles as fit, then walk
                // the leftover blocks by hand.
                int jumps = (n1 - blocks) / (blocks - start[0]);
                copies += jumps * (copies - start[1]);
                blocks += jumps * (blocks - start[0]);
                seen.clear();
            } else {
                seen.put(cursor, new int[] { blocks, copies });
            }
        }
        return copies / n2;
    }
}
