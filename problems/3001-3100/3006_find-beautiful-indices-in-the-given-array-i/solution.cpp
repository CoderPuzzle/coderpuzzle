class Solution {
  public:
    vector<int> beautifulIndices(string s, string a, string b, int k) {
        // An index is beautiful exactly when it is an occurrence of a whose
        // window [i - k, i + k] contains an occurrence of b. Collect both
        // occurrence lists once — each find restarts one character past the
        // previous hit so overlapping occurrences are not skipped — then for
        // each a-occurrence binary-search the sorted b-list for the leftmost
        // entry >= i - k; it qualifies iff that entry also satisfies
        // <= i + k. Ascending a-occurrences keep the answer ascending.
        auto collect = [&](const string &pattern) {
            vector<int> found;
            size_t start = s.find(pattern);
            while (start != string::npos) {
                found.push_back((int)start);
                start = s.find(pattern, start + 1);
            }
            return found;
        };
        vector<int> where_b = collect(b);
        vector<int> answer;
        for (int i : collect(a)) {
            auto candidate = lower_bound(where_b.begin(), where_b.end(), i - k);
            if (candidate != where_b.end() && *candidate <= i + k) {
                answer.push_back(i);
            }
        }
        return answer;
    }
};
