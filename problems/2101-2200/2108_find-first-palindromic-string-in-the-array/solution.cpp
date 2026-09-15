class Solution {
  public:
    string firstPalindrome(vector<string> &words) {
        for (const string &word : words) {
            int left = 0;
            int right = static_cast<int>(word.size()) - 1;
            while (left < right && word[left] == word[right]) {
                ++left;
                --right;
            }
            if (left >= right)
                return word;
        }
        return "";
    }
};
