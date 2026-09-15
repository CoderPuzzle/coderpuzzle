class Solution {
  public:
    bool equationsPossible(vector<string> &equations) {
        // Each letter starts as its own class; parent[x] names its root.
        int parent[26];
        for (int letter = 0; letter < 26; ++letter) {
            parent[letter] = letter;
        }
        // Pass one fuses every equality, so each class is the full set of
        // letters some chain of '==' has tied together.
        for (const auto &equation : equations) {
            if (equation[1] == '=') {
                int left = find(parent, equation[0] - 'a');
                parent[left] = find(parent, equation[3] - 'a');
            }
        }
        // Pass two judges the disequalities: an inequality whose sides sit
        // in one class is unsatisfiable, since both must take one value.
        for (const auto &equation : equations) {
            if (equation[1] == '!') {
                if (find(parent, equation[0] - 'a') == find(parent, equation[3] - 'a')) {
                    return false;
                }
            }
        }
        return true;
    }

  private:
    // Iterative find with path compression: chase to the root, then point
    // every visited letter straight at it.
    int find(int parent[26], int letter) {
        int root = letter;
        while (parent[root] != root) {
            root = parent[root];
        }
        while (parent[letter] != root) {
            int next = parent[letter];
            parent[letter] = root;
            letter = next;
        }
        return root;
    }
};
