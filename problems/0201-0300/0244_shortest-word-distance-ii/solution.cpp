#include <string>
#include <unordered_map>
#include <vector>

// One index list per word, built once at construction; shortest() walks
// the two sorted index lists in lockstep, always advancing the smaller
// index — every pair that can still improve the gap gets examined, so one
// merge finds the closest pair.
class WordDistance {
  public:
    WordDistance(vector<string> wordsDict) {
        // Appending left to right keeps each word's indices ascending —
        // the walk relies on both lists being sorted.
        for (int index = 0; index < (int)wordsDict.size(); ++index) {
            positions[wordsDict[index]].push_back(index);
        }
    }

    int shortest(string word1, string word2) {
        const vector<int> &first = positions.at(word1);
        const vector<int> &second = positions.at(word2);
        int best = abs(first[0] - second[0]);
        size_t i = 0;
        size_t j = 0;
        while (i < first.size() && j < second.size()) {
            int gap = abs(first[i] - second[j]);
            if (gap < best) {
                best = gap;
            }
            // Advancing the larger index can only widen the gap, so the
            // smaller one takes the step.
            if (first[i] < second[j]) {
                ++i;
            } else {
                ++j;
            }
        }
        return best;
    }

  private:
    unordered_map<string, vector<int>> positions;
};
