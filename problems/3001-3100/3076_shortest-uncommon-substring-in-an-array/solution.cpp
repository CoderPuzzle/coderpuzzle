class Solution {
  public:
    vector<string> shortestSubstrings(vector<string> &arr) {
        // Join every other string into one scan text, NUL-separated so a
        // match can never straddle a boundary; since candidates contain
        // only lowercase letters, one containment test per candidate
        // then covers "occurs in any other string". Candidates are
        // tried shortest first and, within a length, in sorted order,
        // so the first survivor is both shortest and smallest.
        vector<string> answer;
        answer.reserve(arr.size());
        for (size_t i = 0; i < arr.size(); ++i) {
            string others;
            for (size_t j = 0; j < arr.size(); ++j) {
                if (j != i) {
                    others += arr[j];
                    others += '\0';
                }
            }
            const string &s = arr[i];
            string best;
            for (int length = 1; length <= (int)s.size() && best.empty(); ++length) {
                set<string> candidates;
                for (int a = 0; a + length <= (int)s.size(); ++a) {
                    candidates.insert(s.substr(a, length));
                }
                for (const string &candidate : candidates) {
                    if (others.find(candidate) == string::npos) {
                        best = candidate;
                        break;
                    }
                }
            }
            answer.push_back(best);
        }
        return answer;
    }
};
