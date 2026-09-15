import java.util.HashSet;
import java.util.Set;

class Solution {

    public int countElements(int[] arr) {
        Set<Integer> seen = new HashSet<>();
        for (int x : arr) {
            seen.add(x);
        }
        int count = 0;
        for (int x : arr) {
            if (seen.contains(x + 1)) {
                count++;
            }
        }
        return count;
    }
}
