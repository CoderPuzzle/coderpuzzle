class Solution {
  public:
    int countPrefixSuffixPairs(vector<string> &words) {
        int total = 0;
        for (int i = 0; i < (int)words.size(); ++i) {
            for (int j = i + 1; j < (int)words.size(); ++j) {
                if (isPrefixAndSuffix(words[i], words[j])) {
                    ++total;
                }
            }
        }
        return total;
    }

  private:
    bool isPrefixAndSuffix(const string &str1, const string &str2) {
        int size1 = str1.size();
        int size2 = str2.size();
        if (size1 > size2) {
            return false;
        }
        for (int index = 0; index < size1; ++index) {
            if (str1[index] != str2[index]) {
                return false;
            }
            if (str1[index] != str2[size2 - size1 + index]) {
                return false;
            }
        }
        return true;
    }
};
