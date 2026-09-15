class Solution {
  public:
    string shortestCompletingWord(string licensePlate, vector<string> &words) {
        // The plate's demand: how many of each letter a word must supply.
        // ASCII puts every uppercase letter in 65..90 and its lowercase
        // twin 32 codes higher, so one range check + 32 folds the case;
        // digits and spaces match neither range and demand nothing.
        vector<int> plate(26, 0);
        for (char c : licensePlate) {
            if (c >= 'A' && c <= 'Z') {
                c = char(c + 32);
            }
            if (c >= 'a' && c <= 'z') {
                plate[c - 'a']++;
            }
        }
        string best;
        for (const string &word : words) {
            // First-wins: only a strictly shorter word can displace the
            // best seen so far, so equal or longer words are skipped
            // without even counting their letters.
            if (!best.empty() && word.size() >= best.size()) {
                continue;
            }
            vector<int> counts(26, 0);
            for (char c : word) {
                counts[c - 'a']++;
            }
            // Covering: the word holds at least the plate's multiplicity
            // of every letter. Extra letters are free.
            bool completes = true;
            for (int i = 0; i < 26; i++) {
                if (counts[i] < plate[i]) {
                    completes = false;
                    break;
                }
            }
            if (completes) {
                best = word;
            }
        }
        // The statement guarantees a completing word exists, so best is
        // never empty on valid input.
        return best;
    }
};
