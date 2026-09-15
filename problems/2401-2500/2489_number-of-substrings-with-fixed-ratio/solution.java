import java.util.HashMap;
import java.util.Map;

class Solution {

    public long fixedRatio(String s, int num1, int num2) {
        // A substring's zeros z and ones o have ratio num1 : num2 exactly
        // when z*num2 == o*num1. With prefix counts Z, O, the substring
        // (l, r) qualifies exactly when Z[r]*num2 - O[r]*num1 equals
        // Z[l]*num2 - O[l]*num1, so counting pairs of equal prefix keys is
        // the whole task. The key reaches 10^5*10^5 = 10^10, so it is
        // stored as a long.
        Map<Long, Long> seen = new HashMap<>();
        seen.put(0L, 1L);
        int z = 0;
        int o = 0;
        long ans = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '0') {
                z++;
            } else {
                o++;
            }
            long key = (long) z * num2 - (long) o * num1;
            long prev = seen.getOrDefault(key, 0L);
            ans += prev;
            seen.put(key, prev + 1);
        }
        return ans;
    }
}
