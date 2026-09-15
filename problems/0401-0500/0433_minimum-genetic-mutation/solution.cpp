class Solution {
  public:
    int minMutation(string startGene, string endGene, vector<string> &bank) {
        // Already there: no character has to change, and no path through the
        // bank can beat zero mutations.
        if (startGene == endGene) {
            return 0;
        }
        // BFS over the mutation graph: genes are nodes, edges join genes that
        // differ in exactly one of the 8 characters, and every step after the
        // first must land on a bank entry.
        vector<char> visited(bank.size(), 0);
        vector<string> frontier;
        frontier.push_back(startGene);
        int depth = 0;
        while (!frontier.empty()) {
            ++depth;
            vector<string> next;
            for (const string &gene : frontier) {
                for (size_t i = 0; i < bank.size(); ++i) {
                    if (visited[i] || differences(gene, bank[i]) != 1) {
                        continue;
                    }
                    if (bank[i] == endGene) {
                        return depth;
                    }
                    visited[i] = 1;
                    next.push_back(bank[i]);
                }
            }
            frontier = move(next);
        }
        return -1;
    }

  private:
    // Number of positions in which two equal-length genes differ.
    static int differences(const string &a, const string &b) {
        int count = 0;
        for (size_t i = 0; i < a.size() && i < b.size(); ++i) {
            if (a[i] != b[i]) {
                ++count;
            }
        }
        return count;
    }
};
