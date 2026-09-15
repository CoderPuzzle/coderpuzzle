class Solution {
  public:
    vector<string> removeAnagrams(vector<string> &words) {
        vector<string> result;
        string prev;
        for (const string &word : words) {
            string signature = word;
            sort(signature.begin(), signature.end());
            if (signature != prev) {
                result.push_back(word);
                prev = move(signature);
            }
        }
        return result;
    }
};
