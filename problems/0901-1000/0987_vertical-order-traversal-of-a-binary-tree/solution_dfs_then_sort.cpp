#include <algorithm>
#include <tuple>
#include <vector>

class Solution {
  public:
    vector<vector<int>> verticalTraversal(TreeNode *root) {
        // Pure collector: a root-first DFS (left before right, explicit
        // stack, no recursion) appends one (column, row, value) record per
        // node and keeps no answer structure at all.
        vector<tuple<int, int, int>> triples;
        vector<tuple<TreeNode *, int, int>> pending;
        pending.emplace_back(root, 0, 0);
        while (!pending.empty()) {
            auto [node, row, col] = pending.back();
            pending.pop_back();
            if (node == nullptr) {
                continue;
            }
            triples.emplace_back(col, row, node->val);
            pending.emplace_back(node->right, row + 1, col + 1);
            pending.emplace_back(node->left, row + 1, col - 1);
        }
        // One sort settles every ordering at once: columns left to right,
        // rows top to bottom, and values breaking the ties of nodes that
        // share one cell — tuple order already compares the three
        // components in that priority. The answer is then just runs of
        // equal columns.
        sort(triples.begin(), triples.end());
        vector<vector<int>> answer;
        for (size_t index = 0; index < triples.size(); ++index) {
            if (index == 0 || get<0>(triples[index]) != get<0>(triples[index - 1])) {
                answer.push_back({});
            }
            answer.back().push_back(get<2>(triples[index]));
        }
        return answer;
    }
};
