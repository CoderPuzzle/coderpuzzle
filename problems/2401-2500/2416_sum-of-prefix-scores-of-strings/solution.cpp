class Solution {
  public:
    vector<int> sumPrefixScores(vector<string> &words) {
        struct Node {
            unordered_map<char, int> next;
            int cnt = 0;
        };
        // flat node arena (index 0 = root) shared by every word
        vector<Node> trie(1);
        for (const string &word : words) {
            int node = 0;
            for (char ch : word) {
                auto it = trie[node].next.find(ch);
                if (it == trie[node].next.end()) {
                    trie.push_back(Node());
                    it = trie[node].next.emplace(ch, (int)trie.size() - 1).first;
                }
                node = it->second;
                // count at every depth: the word itself scores its own prefixes
                trie[node].cnt++;
            }
        }
        // second pass: a word's answer is the sum of cnt along its trie path
        vector<int> scores;
        scores.reserve(words.size());
        for (const string &word : words) {
            int node = 0;
            int total = 0;
            for (char ch : word) {
                node = trie[node].next[ch];
                // cnt of the reached node is the score of the prefix so far
                total += trie[node].cnt;
            }
            scores.push_back(total);
        }
        return scores;
    }
};
