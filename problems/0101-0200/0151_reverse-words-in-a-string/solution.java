class Solution {

    public String reverseWords(String s) {
        // Java strings are immutable, so the sweep runs on a char array — the
        // honest equivalent of the in-place algorithm.
        char[] chars = s.toCharArray();
        // Flip the whole text once: word order reverses, and every word's
        // letters come out backwards. The sweep below puts the letters back.
        reverseRange(chars, 0, chars.length - 1);
        int n = chars.length,
            write = 0,
            read = 0;
        while (read < n) {
            // Skip the run of spaces before the next word.
            while (read < n && chars[read] == ' ') read++;
            if (read == n) break;
            // One separating space between words, none before the first.
            if (write > 0) chars[write++] = ' ';
            int start = write;
            while (read < n && chars[read] != ' ') chars[write++] = chars[read++];
            // The word just copied still has its letters flipped; restore them.
            reverseRange(chars, start, write - 1);
        }
        return new String(chars, 0, write);
    }

    // Flip a range of the buffer in place, endpoints included.
    private static void reverseRange(char[] chars, int lo, int hi) {
        while (lo < hi) {
            char tmp = chars[lo];
            chars[lo++] = chars[hi];
            chars[hi--] = tmp;
        }
    }
}
