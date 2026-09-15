class Solution {

    public String kthCharacter(int k) {
        // Simulate the operation directly: each pass appends a copy of the
        // current word with every letter advanced to its next character
        // (wrapping z back to a), so the length doubles. Nine passes already
        // exceed k = 500 since 2^9 = 512, and characters never change once
        // written, so when the word first reaches length k the character at
        // index k - 1 is the answer.
        StringBuilder word = new StringBuilder("a");
        while (word.length() < k) {
            int n = word.length();
            for (int i = 0; i < n; ++i) {
                word.append((char) ('a' + ((word.charAt(i) - 'a' + 1) % 26)));
            }
        }
        return String.valueOf(word.charAt(k - 1));
    }
}
