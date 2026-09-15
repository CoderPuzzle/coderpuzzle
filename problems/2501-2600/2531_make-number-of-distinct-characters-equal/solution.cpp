class Solution {
  public:
    bool isItPossible(string word1, string word2) {
        // One frequency array per word: any single move shifts exactly two
        // buckets, so its effect on the distinct counts is O(1) to evaluate.
        vector<int> c1(26, 0);
        vector<int> c2(26, 0);
        for (char ch : word1)
            c1[ch - 'a']++;
        for (char ch : word2)
            c2[ch - 'a']++;
        int n1 = 0;
        int n2 = 0;
        for (int v : c1)
            n1 += v > 0;
        for (int v : c2)
            n2 += v > 0;
        // Try every ordered pair (a, b): letter a leaves word1 and letter b
        // takes its place; equal letters mean the swap changes nothing.
        for (int a = 0; a < 26; a++) {
            if (c1[a] == 0)
                continue;
            for (int b = 0; b < 26; b++) {
                if (c2[b] == 0)
                    continue;
                if (a == b) {
                    // Swapping identical letters changes nothing, so this
                    // candidate succeeds exactly when the words already tie.
                    if (n1 == n2)
                        return true;
                    continue;
                }
                int d1 = n1 - (c1[a] == 1) + (c1[b] == 0);
                int d2 = n2 - (c2[b] == 1) + (c2[a] == 0);
                if (d1 == d2)
                    return true;
            }
        }
        return false;
    }
};
