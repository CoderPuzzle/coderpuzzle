class Solution {
  public:
    int countWords(vector<string> &words1, vector<string> &words2) {
        unordered_map<string, int> first;
        unordered_map<string, int> second;
        for (const string &word : words1)
            ++first[word];
        for (const string &word : words2)
            ++second[word];
        int answer = 0;
        for (const auto &[word, frequency] : first) {
            if (frequency == 1 && second[word] == 1)
                ++answer;
        }
        return answer;
    }
};
