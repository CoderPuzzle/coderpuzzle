class Solution {
  public:
    int uniqueMorseRepresentations(vector<string> &words) {
        // Morse code of 'a'..'z' in alphabetical order; a letter's entry
        // sits at c - 'a'.
        static const array<string, 26> MORSE = {".-",   "-...", "-.-.", "-..",  ".",   "..-.", "--.",  "....", "..",
                                                ".---", "-.-",  ".-..", "--",   "-.",  "---",  ".--.", "--.-", ".-.",
                                                "...",  "-",    "..-",  "...-", ".--", "-..-", "-.--", "--.."};
        // A word's transformation is its letters' codes joined in order; the
        // set counts distinct results, so equal transformations fold.
        unordered_set<string> seen;
        for (const auto &word : words) {
            string transformation;
            for (char c : word) {
                transformation += MORSE[c - 'a'];
            }
            seen.insert(transformation);
        }
        return (int)seen.size();
    }
};
