#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
  public:
    vector<int> countWordOccurrences(vector<string> &chunks, vector<string> &queries) {
        string text;
        for (auto &chunk : chunks)
            text += chunk;
        unordered_map<string, int> counts;
        string current;

        auto flush = [&]() {
            if (!current.empty())
                ++counts[current];
            current.clear();
        };

        for (int i = 0; i < (int)text.size(); ++i) {
            char c = text[i];
            if (c == '-') {
                bool previous = i > 0 && text[i - 1] >= 'a' && text[i - 1] <= 'z';
                bool next = i + 1 < (int)text.size() && text[i + 1] >= 'a' && text[i + 1] <= 'z';
                if (previous && next)
                    current += c;
                else
                    flush();
            } else if (c >= 'a' && c <= 'z') {
                current += c;
            } else {
                flush();
            }
        }
        flush();

        vector<int> answer;
        answer.reserve(queries.size());
        for (auto &query : queries)
            answer.push_back(counts[query]);
        return answer;
    }
};
