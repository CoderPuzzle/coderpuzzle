class Solution {
  public:
    int getMaxRepetitions(string s1, int n1, string s2, int n2) {
        // Walk str1 one s1-block at a time. The only state crossing a block
        // boundary is the cursor into s2 plus the copies consumed so far, and
        // the cursor alone decides how any later block plays out — so a
        // repeated cursor exposes a cycle that can be jumped arithmetically.
        unordered_map<int, pair<int, int>> seen;
        int cursor = 0, copies = 0, blocks = 0;
        while (blocks < n1) {
            for (char ch : s1) {
                if (ch == s2[cursor]) {
                    cursor++;
                    if (cursor == (int)s2.size()) {
                        cursor = 0;
                        copies++;
                    }
                }
            }
            blocks++;
            auto found = seen.find(cursor);
            if (found != seen.end()) {
                // Every cycle of blocks adds a fixed number of copies; take
                // as many whole cycles as fit, then walk the leftovers.
                int cycleBlocks = blocks - found->second.first;
                int cycleCopies = copies - found->second.second;
                int jumps = (n1 - blocks) / cycleBlocks;
                copies += jumps * cycleCopies;
                blocks += jumps * cycleBlocks;
                seen.clear();
            } else {
                seen[cursor] = {blocks, copies};
            }
        }
        return copies / n2;
    }
};
