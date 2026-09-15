class Solution {
  public:
    int minimumKeypresses(string s) {
        // Each letter's press count is its position among the sorted
        // frequencies: the most frequent 9 are pressed once, the next 9
        // twice, and the remaining 8 three times.
        array<int, 26> freq{};
        for (char ch : s)
            freq[ch - 'a']++;
        sort(freq.begin(), freq.end(), greater<int>());
        int presses = 0;
        for (int rank = 0; rank < 26; ++rank) {
            presses += freq[rank] * (rank / 9 + 1);
        }
        return presses;
    }
};
