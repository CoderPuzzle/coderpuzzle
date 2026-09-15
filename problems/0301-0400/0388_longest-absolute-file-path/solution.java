import java.util.ArrayList;
import java.util.List;

class Solution {

    public int lengthLongestPath(String input) {
        // depths.get(d) is the absolute-path length of the most recent entry
        // seen at depth d; a name at depth d extends the entry at depth d - 1.
        List<Integer> depths = new ArrayList<>();
        depths.add(0);
        int longest = 0;
        for (String token : input.split("\n", -1)) {
            int depth = 0;
            while (token.charAt(depth) == '\t') {
                depth++;
            }
            String name = token.substring(depth);
            // The path to this entry is its parent's path, one '/' separator,
            // then the name itself (the root level has no separator).
            int path = (depth > 0 ? depths.get(depth - 1) + 1 : 0) + name.length();
            if (depth < depths.size()) {
                depths.set(depth, path);
            } else {
                depths.add(path);
            }
            // Files are exactly the names that contain a dot.
            if (name.indexOf('.') >= 0) {
                longest = Math.max(longest, path);
            }
        }
        return longest;
    }
}
