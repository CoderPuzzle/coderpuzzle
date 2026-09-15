class Solution {
  public:
    string kthCharacter(int k) {
        // Simulate the operation directly: each pass appends a copy of the
        // current word with every letter advanced to its next character
        // (wrapping z back to a), so the length doubles. Nine passes already
        // exceed k = 500 since 2^9 = 512, and characters never change once
        // written, so when the word first reaches length k the character at
        // index k - 1 is the answer.
        string word(1, 'a');
        while ((int)word.size() < k) {
            int n = word.size();
            for (int i = 0; i < n; ++i) {
                word.push_back('a' + (word[i] - 'a' + 1) % 26);
            }
        }
        return string(1, word[k - 1]);
    }
};
