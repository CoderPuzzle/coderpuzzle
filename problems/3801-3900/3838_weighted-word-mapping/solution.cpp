#include <string>
#include <vector>

using namespace std;

class Solution {
  public:
    string mapWordWeights(vector<string> &words, vector<int> &weights) {
        // Each word's weight is the sum of its characters' entries in
        // weights — at most 10 chars * 100 = 1000, comfortably inside an
        // int. Reflecting that total's residue mod 26 down from 'z' gives
        // one letter per word (0 -> 'z', 1 -> 'y', ..., 25 -> 'a').
        string result;
        result.reserve(words.size());
        for (const string &word : words) {
            int total = 0;
            for (char c : word) {
                total += weights[c - 'a'];
            }
            result.push_back(char('z' - total % 26));
        }
        return result;
    }
};
