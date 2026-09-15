import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean checkIfExist(int[] arr) {
        // Insert after the lookup so an element can never match itself.
        Set<Integer> seen = new HashSet<>();
        for (int value : arr) {
            if (seen.contains(2 * value) || (value % 2 == 0 && seen.contains(value / 2))) {
                return true;
            }
            seen.add(value);
        }
        return false;
    }
}
