import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] indexPairs(String text, String[] words) {
        List<int[]> result = new ArrayList<>();
        int n = text.length();
        for (int i = 0; i < n; i++) {
            for (String word : words) {
                int end = i + word.length();
                if (end <= n && text.substring(i, end).equals(word)) {
                    result.add(new int[] { i, end - 1 });
                }
            }
        }
        result.sort((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);
        int[][] pairs = new int[result.size()][];
        for (int i = 0; i < result.size(); i++) {
            pairs[i] = result.get(i);
        }
        return pairs;
    }
}
