class Solution {
  private:
    string source;
    int repetitions;
    array<int, 26> quotas{};
    string best;

    bool isRepeated(const string &candidate) {
        int matched = 0;
        int completed = 0;
        for (char character : source) {
            if (character == candidate[matched]) {
                ++matched;
                if (matched == (int)candidate.size()) {
                    if (++completed == repetitions)
                        return true;
                    matched = 0;
                }
            }
        }
        return false;
    }

    void search(const string &candidate) {
        if (candidate.size() > best.size() || (candidate.size() == best.size() && candidate > best))
            best = candidate;

        for (int index = 25; index >= 0; --index) {
            if (quotas[index] == 0)
                continue;
            --quotas[index];
            string extended = candidate + char('a' + index);
            if (isRepeated(extended))
                search(extended);
            ++quotas[index];
        }
    }

  public:
    string longestSubsequenceRepeatedK(string s, int k) {
        source = s;
        repetitions = k;
        quotas.fill(0);
        for (char character : s)
            ++quotas[character - 'a'];
        for (int &quota : quotas)
            quota /= k;

        best.clear();
        search("");
        return best;
    }
};
