import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public String[] maxNumOfSubstrings(String s) {
        int n = s.length();
        int[] first = new int[26];
        int[] last = new int[26];
        Arrays.fill(first, -1);
        for (int i = 0; i < n; ++i) {
            int c = s.charAt(i) - 'a';
            if (first[c] == -1) first[c] = i;
            last[c] = i;
        }

        // Anchor a candidate at every position that is the first occurrence
        // of its character, then push `end` out to cover every character
        // met along the way. The expansion is a fixed point: it stops the
        // moment nothing inside [start, end] demands more room.
        List<int[]> candidates = new ArrayList<>();
        for (int i = 0; i < n; ++i) {
            int c0 = s.charAt(i) - 'a';
            if (first[c0] != i) continue;
            int start = i;
            int end = last[c0];
            boolean valid = true;
            for (int j = start; j <= end; ++j) {
                int c = s.charAt(j) - 'a';
                if (first[c] < start) {
                    // This character escapes to the left of the anchor, so
                    // no substring starting at `i` can ever be valid.
                    valid = false;
                    break;
                }
                end = Math.max(end, last[c]);
            }
            if (valid) candidates.add(new int[] { start, end });
        }

        // Classic activity-selection greedy: earliest-ending candidate
        // first, ties broken by length so a shorter, nested candidate is
        // preferred over the longer one that contains it.
        candidates.sort((a, b) -> {
            if (a[1] != b[1]) return Integer.compare(a[1], b[1]);
            return Integer.compare(a[1] - a[0], b[1] - b[0]);
        });

        List<String> result = new ArrayList<>();
        int prevEnd = -1;
        for (int[] range : candidates) {
            if (range[0] > prevEnd) {
                result.add(s.substring(range[0], range[1] + 1));
                prevEnd = range[1];
            }
        }
        return result.toArray(new String[0]);
    }
}
