class Solution {
  public:
    vector<bool> camelMatch(vector<string> &queries, string pattern) {
        vector<bool> answer;
        answer.reserve(queries.size());
        for (const string &query : queries) {
            answer.push_back(matches(query, pattern));
        }
        return answer;
    }

  private:
    // Two-pointer scan: advance the pattern pointer on a match, skip a
    // lowercase letter as an implicit insertion, and reject outright on an
    // uppercase letter that doesn't match. The query matches only if every
    // pattern character was consumed by the end of the scan.
    bool matches(const string &query, const string &pattern) {
        size_t j = 0;
        for (char c : query) {
            if (j < pattern.size() && c == pattern[j]) {
                ++j;
            } else if (isupper(static_cast<unsigned char>(c))) {
                return false;
            }
        }
        return j == pattern.size();
    }
};
