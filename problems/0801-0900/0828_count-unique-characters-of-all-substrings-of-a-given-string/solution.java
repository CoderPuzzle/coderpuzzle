import java.util.ArrayList;
import java.util.List;

class Solution {

    public int uniqueLetterString(String s) {
        // Reorganize the sum per occurrence: a letter adds 1 exactly
        // for substrings in which it appears precisely once. Bucket
        // the indices of each letter.
        List<List<Integer>> positions = new ArrayList<>();
        for (int c = 0; c < 26; c++) {
            positions.add(new ArrayList<>());
        }
        for (int i = 0; i < s.length(); i++) {
            positions.get(s.charAt(i) - 'A').add(i);
        }
        int n = s.length();
        long total = 0;
        for (List<Integer> list : positions) {
            if (list.isEmpty()) {
                continue;
            }
            // Sentinels -1 and n give the first and last occurrences
            // the same window arithmetic.
            int[] pos = new int[list.size() + 2];
            pos[0] = -1;
            for (int k = 0; k < list.size(); k++) {
                pos[k + 1] = list.get(k);
            }
            pos[list.size() + 1] = n;
            for (int k = 1; k < pos.length - 1; k++) {
                // i-p left endpoints after the previous equal letter,
                // q-i right endpoints before the next: each
                // (substring, unique char) pair counted exactly once.
                total += (long) (pos[k] - pos[k - 1]) * (pos[k + 1] - pos[k]);
            }
        }
        return (int) total;
    }
}
