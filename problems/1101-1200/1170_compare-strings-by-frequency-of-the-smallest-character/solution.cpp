class Solution {
  public:
    int f(const string &s) {
        // Smallest character of the string, then how often it appears.
        char smallest = *min_element(s.begin(), s.end());
        return (int)count(s.begin(), s.end(), smallest);
    }

    vector<int> numSmallerByFrequency(vector<string> &queries, vector<string> &words) {
        vector<int> freqs;
        freqs.reserve(words.size());
        for (const string &w : words) {
            freqs.push_back(f(w));
        }
        sort(freqs.begin(), freqs.end());
        vector<int> answer;
        answer.reserve(queries.size());
        for (const string &q : queries) {
            int p = f(q);
            // Everything strictly above p forms one sorted suffix; find
            // where it starts.
            int lo = 0, hi = (int)freqs.size();
            while (lo < hi) {
                int mid = lo + (hi - lo) / 2;
                if (freqs[mid] <= p) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            answer.push_back((int)freqs.size() - lo);
        }
        return answer;
    }
};
