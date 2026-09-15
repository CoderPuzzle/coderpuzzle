class Solution {
  public:
    string kthDistinct(vector<string> &arr, int k) {
        unordered_map<string, int> frequencies;
        for (const string &word : arr) {
            ++frequencies[word];
        }
        for (const string &word : arr) {
            if (frequencies[word] == 1 && --k == 0) {
                return word;
            }
        }
        return "";
    }
};
