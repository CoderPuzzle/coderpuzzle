import java.util.HashMap;
import java.util.Map;

class FileSystem {

    // One map from full path strings to values; structure lives in the keys.
    private Map<String, Integer> values = new HashMap<>();

    public FileSystem() {}

    public boolean createPath(String path, int value) {
        // Reject a repeat; then the parent is everything before the last
        // slash. An empty slice means the path hangs off the root directly.
        if (values.containsKey(path)) {
            return false;
        }
        String parent = path.substring(0, path.lastIndexOf('/'));
        if (!parent.isEmpty() && !values.containsKey(parent)) {
            return false;
        }
        values.put(path, value);
        return true;
    }

    public int get(String path) {
        return values.getOrDefault(path, -1);
    }
}
