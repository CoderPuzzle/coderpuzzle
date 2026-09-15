import java.util.HashSet;
import java.util.Set;

class Solution {

    public int equalDigitFrequency(String s) {
        // For each start index, extend the substring one digit at a time while
        // tracking digit counts; the running (distinct digits, max frequency)
        // pair tests "every digit appears equally" in O(1) per extension.
        int n = s.length();
        Set<String> seen = new HashSet<>();
        for (int start = 0; start < n; ++start) {
            int[] counts = new int[10];
            int distinct = 0;
            int maxCount = 0;
            StringBuilder builder = new StringBuilder();
            for (int end = start; end < n; ++end) {
                int digit = s.charAt(end) - '0';
                if (counts[digit] == 0) {
                    ++distinct;
                }
                ++counts[digit];
                maxCount = Math.max(maxCount, counts[digit]);
                builder.append(s.charAt(end));
                if (maxCount * distinct == end - start + 1) {
                    seen.add(builder.toString());
                }
            }
        }
        return seen.size();
    }
}
