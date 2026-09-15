class Solution {

    public String[] printVertically(String s) {
        // Row k takes character k of every word in order; short words pad
        // with a space, and trailing spaces are trimmed off each row.
        String[] words = s.split(" ", -1);
        int height = 0;
        for (String word : words) {
            height = Math.max(height, word.length());
        }
        String[] rows = new String[height];
        char[] buffer = new char[words.length];
        for (int k = 0; k < height; ++k) {
            int last = 0;
            for (int w = 0; w < words.length; ++w) {
                if (k < words[w].length()) {
                    buffer[w] = words[w].charAt(k);
                    last = w + 1;
                } else {
                    buffer[w] = ' ';
                }
            }
            rows[k] = new String(buffer, 0, last);
        }
        return rows;
    }
}
