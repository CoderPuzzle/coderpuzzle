#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

// One abbreviation group per abbreviation, held as a set of words;
// isUnique() applies the two-condition rule directly: the group for the
// query's abbreviation must be empty, or contain nothing but the query
// itself.
class ValidWordAbbr {
  public:
    ValidWordAbbr(vector<string> dictionary) {
        // A set per abbreviation: listing "deer" twice must leave the
        // group {"deer"} — a word never collides with its own duplicates.
        for (const string &word : dictionary) {
            groups[abbrev(word)].insert(word);
        }
    }

    bool isUnique(string word) {
        auto found = groups.find(abbrev(word));
        // No word with this abbreviation, or every such word is `word`.
        if (found == groups.end())
            return true;
        const unordered_set<string> &group = found->second;
        return group.size() == 1 && group.count(word);
    }

  private:
    static string abbrev(const string &word) {
        // First letter + count of the letters between + last letter; a
        // word of one or two characters is an abbreviation of itself.
        if (word.size() <= 2)
            return word;
        return word.front() + to_string(word.size() - 2) + word.back();
    }

    unordered_map<string, unordered_set<string>> groups;
};
