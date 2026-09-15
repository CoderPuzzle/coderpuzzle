#include <string>
#include <unordered_map>
#include <vector>

// One hash entry per (prefix, suffix) pair, built once at construction:
// for each word, every prefix of the word is joined to every suffix
// through a '#' -- no word or query can contain it, since both are
// lowercase letters only -- and the entry holds the word's index.
// Processing words left to right makes later words overwrite earlier
// ones, so every entry ends up holding the largest matching index, and
// f() is a single lookup that answers -1 when the key is absent.
class WordFilter {
  public:
    WordFilter(vector<string> words) {
        for (int index = 0; index < (int)words.size(); ++index) {
            const string &word = words[index];
            for (int prefix = 0; prefix <= (int)word.size(); ++prefix) {
                string head = word.substr(0, prefix);
                for (int suffix = 0; suffix <= (int)word.size(); ++suffix) {
                    weights[head + "#" + word.substr(suffix)] = index;
                }
            }
        }
    }

    int f(string pref, string suff) {
        auto found = weights.find(pref + "#" + suff);
        if (found == weights.end()) {
            return -1;
        }
        return found->second;
    }

  private:
    unordered_map<string, int> weights;
};
