class Solution {

    public String[] generateSentences(java.util.List<java.util.List<String>> synonyms, String text) {
        // Union-find over every word mentioned in a pair.
        java.util.Map<String, String> parent = new java.util.HashMap<>();

        class DSU {

            String find(String x) {
                parent.putIfAbsent(x, x);
                while (!parent.get(x).equals(x)) {
                    parent.put(x, parent.get(parent.get(x)));
                    x = parent.get(x);
                }
                return x;
            }
        }
        DSU dsu = new DSU();
        for (java.util.List<String> pair : synonyms) {
            parent.put(dsu.find(pair.get(0)), dsu.find(pair.get(1)));
        }

        java.util.Map<String, java.util.List<String>> groups = new java.util.HashMap<>();
        for (String word : parent.keySet()) {
            groups.computeIfAbsent(dsu.find(word), k -> new java.util.ArrayList<>()).add(word);
        }
        for (java.util.List<String> group : groups.values()) {
            java.util.Collections.sort(group);
        }

        // Expand position by position.
        java.util.List<String> sentences = new java.util.ArrayList<>();
        sentences.add("");
        for (String word : text.split(" ")) {
            java.util.List<String> options = parent.containsKey(word)
                ? groups.get(dsu.find(word))
                : java.util.List.of(word);
            java.util.List<String> next = new java.util.ArrayList<>();
            for (String prefix : sentences) {
                for (String option : options) {
                    next.add(prefix + " " + option);
                }
            }
            sentences = next;
        }
        String[] result = new String[sentences.size()];
        for (int i = 0; i < result.length; ++i) {
            result[i] = sentences.get(i).substring(1);
        }
        java.util.Arrays.sort(result);
        return result;
    }
}
