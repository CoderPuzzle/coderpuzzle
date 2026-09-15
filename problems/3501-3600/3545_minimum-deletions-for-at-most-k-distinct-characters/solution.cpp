class Solution {
  public:
    int minDeletion(string s, int k) {
        // At most k distinct characters may survive, so keep the k most
        // frequent ones and delete every occurrence of the rest: the
        // answer is the sum of the (distinct - k) smallest frequencies.
        int counts[26] = {0};
        for (char ch : s)
            counts[ch - 'a']++;
        vector<int> freqs;
        for (int f : counts)
            if (f > 0)
                freqs.push_back(f);
        sort(freqs.begin(), freqs.end());
        int deletions = 0;
        for (int i = 0; i < (int)freqs.size() - k; i++)
            deletions += freqs[i];
        return deletions;
    }
};
