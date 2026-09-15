import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[][] wordSquares(String[] words) {
        Map<Character, List<String>> byFirst = new HashMap<>();
        Map<Character, List<String>> byLast = new HashMap<>();
        for (String word : words) {
            byFirst.computeIfAbsent(word.charAt(0), key -> new ArrayList<>()).add(word);
            byLast.computeIfAbsent(word.charAt(3), key -> new ArrayList<>()).add(word);
        }
        String[] sorted = words.clone();
        java.util.Arrays.sort(sorted);
        List<String[]> res = new ArrayList<>();
        for (String top : sorted) {
            for (String left : byFirst.getOrDefault(top.charAt(0), List.of())) {
                if (left.equals(top)) {
                    continue;
                }
                for (String right : byFirst.getOrDefault(top.charAt(3), List.of())) {
                    if (right.equals(top) || right.equals(left)) {
                        continue;
                    }
                    for (String bottom : byLast.getOrDefault(right.charAt(3), List.of())) {
                        if (bottom.charAt(0) != left.charAt(3)) {
                            continue;
                        }
                        if (bottom.equals(top) || bottom.equals(left) || bottom.equals(right)) {
                            continue;
                        }
                        res.add(new String[] { top, left, right, bottom });
                    }
                }
            }
        }
        res.sort((a, b) -> {
            for (int i = 0; i < 4; i++) {
                int cmp = a[i].compareTo(b[i]);
                if (cmp != 0) {
                    return cmp;
                }
            }
            return 0;
        });
        return res.toArray(new String[0][]);
    }
}
