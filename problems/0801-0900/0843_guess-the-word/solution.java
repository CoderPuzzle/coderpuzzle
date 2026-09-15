import java.util.ArrayList;
import java.util.List;

class Solution {

    public void findSecretWord(Master master, String[] wordlist) {
        List<String> candidates = new ArrayList<>(List.of(wordlist));
        while (!candidates.isEmpty()) {
            // Pick the word whose worst-case surviving group is smallest:
            // bucket every candidate by its agreement with the candidate
            // under review, and keep the candidate with the smallest largest
            // bucket (minimax elimination).
            String best = candidates.get(0);
            int bestWorst = candidates.size() + 1;
            for (String word : candidates) {
                int[] groups = new int[7];
                for (String other : candidates) {
                    groups[matches(word, other)]++;
                }
                int worst = 0;
                for (int group : groups) {
                    worst = Math.max(worst, group);
                }
                if (worst < bestWorst) {
                    best = word;
                    bestWorst = worst;
                }
            }
            int score = master.guess(best);
            if (score == best.length()) {
                return;
            }
            List<String> survivors = new ArrayList<>();
            for (String word : candidates) {
                if (matches(word, best) == score) {
                    survivors.add(word);
                }
            }
            candidates = survivors;
        }
    }

    private static int matches(String a, String b) {
        int count = 0;
        for (int i = 0; i < Math.min(a.length(), b.length()); i++) {
            if (a.charAt(i) == b.charAt(i)) {
                count++;
            }
        }
        return count;
    }
}
