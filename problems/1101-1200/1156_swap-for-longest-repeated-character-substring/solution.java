import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maxRepOpt1(String text) {
        Map<Character, Integer> counts = new HashMap<>();
        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            counts.merge(ch, 1, Integer::sum);
        }
        // run-length encode
        java.util.List<Character> runChars = new java.util.ArrayList<>();
        java.util.List<Integer> runLens = new java.util.ArrayList<>();
        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            if (!runChars.isEmpty() && runChars.get(runChars.size() - 1) == ch) {
                runLens.set(runLens.size() - 1, runLens.get(runLens.size() - 1) + 1);
            } else {
                runChars.add(ch);
                runLens.add(1);
            }
        }
        int best = 0;
        for (int i = 0; i < runChars.size(); i++) {
            char ch = runChars.get(i);
            int length = runLens.get(i);
            best = Math.max(best, Math.min(length + 1, counts.get(ch)));
        }
        for (int i = 1; i < runChars.size() - 1; i++) {
            if (runLens.get(i) == 1 && runChars.get(i - 1) == runChars.get(i + 1)) {
                char ch = runChars.get(i - 1);
                int combined = runLens.get(i - 1) + runLens.get(i + 1);
                int extra = counts.get(ch) > combined ? 1 : 0;
                best = Math.max(best, combined + extra);
            }
        }
        return best;
    }
}
