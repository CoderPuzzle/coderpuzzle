import java.util.HashSet;
import java.util.Set;

class Solution {

    public String destCity(String[][] paths) {
        Set<String> sources = new HashSet<>();
        for (String[] path : paths) {
            sources.add(path[0]);
        }
        for (String[] path : paths) {
            if (!sources.contains(path[1])) {
                return path[1];
            }
        }
        return "";
    }
}
