import java.util.Map;

class Solution {

    public String convertNumber(String s) {
        // Trie over the ten digit words: nested maps keyed by letter, with
        // "$" marking a node where a word ends. No word is a prefix of
        // another, so a walk from any position crosses at most one terminal,
        // and the first terminal reached is exactly where the word ends.
        Map<String, Object> root = new java.util.HashMap<>();
        String[][] words = {
            { "zero", "0" },
            { "one", "1" },
            { "two", "2" },
            { "three", "3" },
            { "four", "4" },
            { "five", "5" },
            { "six", "6" },
            { "seven", "7" },
            { "eight", "8" },
            { "nine", "9" },
        };
        for (String[] entry : words) {
            Map<String, Object> node = root;
            for (char ch : entry[0].toCharArray()) {
                node = (Map<String, Object>) node.computeIfAbsent(String.valueOf(ch), key ->
                    new java.util.HashMap<String, Object>()
                );
            }
            node.put("$", entry[1]);
        }
        StringBuilder digits = new StringBuilder();
        int n = s.length();
        int i = 0;
        while (i < n) {
            Map<String, Object> node = root;
            int j = i;
            String hit = null;
            while (j < n && node.containsKey(s.substring(j, j + 1))) {
                node = (Map<String, Object>) node.get(s.substring(j, j + 1));
                ++j;
                if (node.containsKey("$")) {
                    hit = (String) node.get("$");
                    break;
                }
            }
            if (hit == null) {
                ++i;
            } else {
                digits.append(hit);
                i = j;
            }
        }
        return digits.toString();
    }
}
