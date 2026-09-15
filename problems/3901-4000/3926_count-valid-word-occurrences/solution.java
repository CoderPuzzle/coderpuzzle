import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] countWordOccurrences(String[] chunks, String[] queries) {
        StringBuilder builder = new StringBuilder();
        for (String chunk : chunks) {
            builder.append(chunk);
        }
        String text = builder.toString();
        Map<String, Integer> counts = new HashMap<>();
        StringBuilder current = new StringBuilder();

        for (int i = 0; i < text.length(); i++) {
            char charAt = text.charAt(i);
            if (charAt == '-') {
                boolean previous = i > 0 && isLower(text.charAt(i - 1));
                boolean next = i + 1 < text.length() && isLower(text.charAt(i + 1));
                if (previous && next) {
                    current.append(charAt);
                } else {
                    flush(current, counts);
                }
            } else if (isLower(charAt)) {
                current.append(charAt);
            } else {
                flush(current, counts);
            }
        }
        flush(current, counts);

        int[] answer = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            answer[i] = counts.getOrDefault(queries[i], 0);
        }
        return answer;
    }

    private boolean isLower(char value) {
        return value >= 'a' && value <= 'z';
    }

    private void flush(StringBuilder current, Map<String, Integer> counts) {
        if (current.length() > 0) {
            String word = current.toString();
            counts.put(word, counts.getOrDefault(word, 0) + 1);
            current.setLength(0);
        }
    }
}
