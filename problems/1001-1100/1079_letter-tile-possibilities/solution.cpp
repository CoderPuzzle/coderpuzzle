class Solution {
  public:
    int numTilePossibilities(string tiles) {
        // Array of 26 counts keyed by letter, not a permutation of indices:
        // identical tiles collapse into one branch, so a sequence built from
        // duplicate letters is only ever counted once.
        array<int, 26> counts{};
        for (char c : tiles)
            counts[c - 'A']++;
        return backtrack(counts);
    }

  private:
    int backtrack(array<int, 26> &counts) {
        int total = 0;
        for (int i = 0; i < 26; i++) {
            if (counts[i] == 0)
                continue;
            // Placing this letter is itself one new, distinct sequence.
            counts[i]--;
            total += 1 + backtrack(counts);
            counts[i]++;
        }
        return total;
    }
};
