class Solution {
  public:
    string frequencySort(string s) {
        // The answer depends only on how often each character occurs, and the
        // alphabet is fixed — one slot per possible character, one pass.
        array<int, 128> counts{};
        for (unsigned char ch : s) {
            counts[ch]++;
        }
        vector<int> ranked(128);
        iota(ranked.begin(), ranked.end(), 0);
        // Frequency descending, ties broken by character ascending — the
        // pinned order that makes the expected output unique.
        sort(ranked.begin(), ranked.end(), [&](int a, int b) {
            if (counts[a] != counts[b])
                return counts[a] > counts[b];
            return a < b;
        });
        string out;
        out.reserve(s.size());
        for (int c : ranked) {
            out.append(counts[c], (char)c);
        }
        return out;
    }
};
