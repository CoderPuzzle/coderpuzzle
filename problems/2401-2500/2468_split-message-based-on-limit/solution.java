import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] splitMessage(String message, int limit) {
        // digitLen[i] = total decimal digit count of integers 1..i, so each
        // candidate part count b costs O(1) instead of O(b).
        int n = message.length();
        int[] digitLen = new int[n + 1];
        for (int x = 1; x <= n; ++x) {
            digitLen[x] = digitLen[x - 1] + Integer.toString(x).length();
        }
        for (int b = 1; b <= n; ++b) {
            int digitsB = Integer.toString(b).length();
            if (2 * digitsB + 3 > limit) break; // widest suffix "<b/b>" won't fit
            // Capacity: sum over a=1..b of (limit - len(str(a)) - digitsB - 3).
            int capacity = b * limit - digitLen[b] - b * digitsB - 3 * b;
            if (capacity < n) continue;
            List<String> parts = new ArrayList<>();
            int pos = 0;
            for (int a = 1; a <= b; ++a) {
                String suffix = "<" + a + "/" + b + ">";
                int take = Math.min(limit - suffix.length(), n - pos);
                parts.add(message.substring(pos, pos + take) + suffix);
                pos += take;
            }
            return parts.toArray(new String[0]);
        }
        return new String[0];
    }
}
