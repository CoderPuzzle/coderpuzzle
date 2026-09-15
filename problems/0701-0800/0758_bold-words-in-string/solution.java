class Solution {

    public String boldWords(String[] words, String s) {
        // Mark every position of s covered by any keyword occurrence.
        int n = s.length();
        boolean[] mask = new boolean[n];
        for (String word : words) {
            // Restart one past each hit so self-overlapping occurrences
            // ("aa" inside "aaa") are all found.
            int start = s.indexOf(word);
            while (start != -1) {
                for (int i = start; i < start + word.length(); i++) {
                    mask[i] = true;
                }
                start = s.indexOf(word, start + 1);
            }
        }
        // Wrap each maximal run of marked positions in exactly one pair.
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (mask[i] && (i == 0 || !mask[i - 1])) {
                out.append("<b>");
            } else if (!mask[i] && i > 0 && mask[i - 1]) {
                out.append("</b>");
            }
            out.append(s.charAt(i));
        }
        if (n > 0 && mask[n - 1]) {
            out.append("</b>");
        }
        return out.toString();
    }
}
