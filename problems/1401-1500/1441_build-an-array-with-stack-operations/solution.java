import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public String[] buildArray(int[] target, int n) {
        Set<Integer> wanted = new HashSet<>();
        for (int value : target) {
            wanted.add(value);
        }
        int last = target[target.length - 1];
        List<String> operations = new ArrayList<>();
        for (int value = 1; value <= last; value++) {
            operations.add("Push");
            if (!wanted.contains(value)) {
                operations.add("Pop");
            }
        }
        return operations.toArray(new String[0]);
    }
}
