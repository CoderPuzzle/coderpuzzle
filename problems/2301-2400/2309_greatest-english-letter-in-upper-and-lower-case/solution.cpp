class Solution {
  public:
    string greatestLetter(string s) {
        // present[0..25] = lowercase seen, present[26..51] = uppercase seen.
        bool present[52] = {false};
        for (char c : s) {
            if (c >= 'a') {
                present[c - 'a'] = true;
            } else {
                present[26 + c - 'A'] = true;
            }
        }
        for (int i = 25; i >= 0; i--) {
            if (present[i] && present[26 + i]) {
                return string(1, static_cast<char>('A' + i));
            }
        }
        return "";
    }
};
