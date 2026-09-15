class Solution {
  public:
    vector<string> findWords(vector<string> &words) {
        // One table from each letter to its keyboard row 0, 1 or 2, built once
        // from the three row listings: both cases of a letter land in the same
        // bucket, which is the whole case-insensitivity story.
        vector<int> rowOf(128, 0);
        const string rows[3] = {"qwertyuiop", "asdfghjkl", "zxcvbnm"};
        for (int row = 0; row < 3; ++row)
            for (char ch : rows[row]) {
                rowOf[(unsigned char)ch] = row;
                rowOf[toupper((unsigned char)ch)] = row;
            }
        vector<string> result;
        for (const string &word : words) {
            // A word is typeable on one row iff no letter ever leaves the row
            // its first letter already fixed; the word keeps its own casing.
            int firstRow = rowOf[(unsigned char)word[0]];
            bool oneRow = true;
            for (char ch : word)
                if (rowOf[(unsigned char)ch] != firstRow) {
                    oneRow = false;
                    break;
                }
            if (oneRow)
                result.push_back(word);
        }
        return result;
    }
};
