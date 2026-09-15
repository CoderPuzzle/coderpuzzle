class Solution {
  public:
    string toGoatLatin(string sentence) {
        // One pass over the words. Each word is reshaped by its first letter
        // alone: a vowel-initial word survives intact, a consonant-initial
        // word rotates its first letter to the end. Every word then takes
        // "ma" plus one more 'a' per its 1-based index, so the i-th word
        // ends in exactly i 'a's. The vowel test is case-blind: 'I' opens
        // the first example as a vowel.
        const string vowels = "aeiouAEIOU";
        istringstream in(sentence);
        string word, out;
        int index = 0;
        while (in >> word) {
            ++index;
            if (vowels.find(word[0]) == string::npos) {
                word = word.substr(1) + word[0];
            }
            if (index > 1) {
                out += ' ';
            }
            out += word + "ma" + string(index, 'a');
        }
        return out;
    }
};
