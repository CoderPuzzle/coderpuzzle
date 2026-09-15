#include <string>
#include <unordered_map>
#include <vector>

// Words grouped by length; each buildDict REPLACES the previous dictionary,
// so search only ever sees the latest call's words. A candidate matches when
// it differs from the search word in exactly one position — other lengths
// never reach the comparison.
class MagicDictionary {
  public:
    MagicDictionary() {}

    void buildDict(vector<string> dictionary) {
        buckets.clear();
        for (string &word : dictionary) {
            buckets[word.size()].push_back(std::move(word));
        }
    }

    bool search(string searchWord) {
        auto found = buckets.find(searchWord.size());
        if (found == buckets.end()) {
            return false;
        }
        for (const string &word : found->second) {
            int mismatches = 0;
            for (size_t index = 0; index < word.size(); ++index) {
                if (word[index] != searchWord[index]) {
                    ++mismatches;
                    if (mismatches > 1) {
                        break;
                    }
                }
            }
            if (mismatches == 1) {
                return true;
            }
        }
        return false;
    }

  private:
    unordered_map<size_t, vector<string>> buckets;
};
