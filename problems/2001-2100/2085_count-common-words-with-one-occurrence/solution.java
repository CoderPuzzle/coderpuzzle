import java.util.HashMap;
import java.util.Map;

class Solution {

    public int countWords(String[] words1, String[] words2) {
        Map<String, Integer> first = frequencies(words1);
        Map<String, Integer> second = frequencies(words2);
        int answer = 0;
        for (Map.Entry<String, Integer> entry : first.entrySet()) {
            if (entry.getValue() == 1 && second.getOrDefault(entry.getKey(), 0) == 1) answer++;
        }
        return answer;
    }

    private Map<String, Integer> frequencies(String[] words) {
        Map<String, Integer> counts = new HashMap<>();
        for (String word : words) counts.merge(word, 1, Integer::sum);
        return counts;
    }
}
