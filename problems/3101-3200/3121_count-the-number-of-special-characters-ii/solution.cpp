class Solution {
  public:
    int numberOfSpecialChars(string word) {
        // Special means every lowercase occurrence sits before the first
        // uppercase one, i.e. last-lower index < first-upper index; both
        // positions per letter are captured in a single pass.
        vector<int> firstUpper(26, -1), lastLower(26, -1);
        for (int position = 0; position < static_cast<int>(word.size()); position++) {
            char ch = word[position];
            if (ch >= 'a') {
                lastLower[ch - 'a'] = position;
            } else if (firstUpper[ch - 'A'] == -1) {
                firstUpper[ch - 'A'] = position;
            }
        }
        int count = 0;
        for (int k = 0; k < 26; k++) {
            if (firstUpper[k] != -1 && lastLower[k] != -1 && lastLower[k] < firstUpper[k]) {
                count++;
            }
        }
        return count;
    }
};
