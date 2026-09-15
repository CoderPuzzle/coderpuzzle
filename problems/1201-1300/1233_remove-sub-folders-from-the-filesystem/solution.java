import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public String[] removeSubfolders(String[] folder) {
        String[] sorted = folder.clone();
        Arrays.sort(sorted);
        List<String> out = new ArrayList<>();
        for (String path : sorted) {
            // The slash separates a true child ("/a" + "/") from a longer
            // sibling sharing the name prefix ("/ab" vs "/a/").
            if (out.isEmpty() || !path.startsWith(out.get(out.size() - 1) + "/")) {
                out.add(path);
            }
        }
        return out.toArray(new String[0]);
    }
}
