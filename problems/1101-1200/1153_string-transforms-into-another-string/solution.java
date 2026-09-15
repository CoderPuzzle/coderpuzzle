import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public boolean canConvert(String str1, String str2) {
        if (str1.equals(str2)) {
            // Zero conversions needed; cycles in the mapping never fire.
            return true;
        }
        Map<Character, Character> mapping = new HashMap<>();
        for (int i = 0; i < str1.length(); ++i) {
            char a = str1.charAt(i),
                b = str2.charAt(i);
            Character prior = mapping.get(a);
            if (prior != null && prior != b) {
                // One source letter would need two different targets.
                return false;
            }
            mapping.put(a, b);
        }
        // A cycle needs a spare letter to break it, and a spare is any
        // letter that never appears as a target.
        Set<Character> targets = new HashSet<>(mapping.values());
        return targets.size() < 26;
    }
}
