#include <map>
#include <tuple>
#include <utility>
#include <vector>

class Solution {
  public:
    vector<vector<int>> verticalTraversal(TreeNode *root) {
        // One (column, row, value) record per node, gathered by an
        // explicit-stack DFS — no recursion, so a 1000-node chain cannot
        // exhaust any call stack.
        map<int, vector<pair<int, int>>> cells;
        vector<tuple<TreeNode *, int, int>> pending;
        pending.emplace_back(root, 0, 0);
        while (!pending.empty()) {
            auto [node, row, col] = pending.back();
            pending.pop_back();
            if (node == nullptr) {
                continue;
            }
            cells[col].emplace_back(row, node->val);
            pending.emplace_back(node->right, row + 1, col + 1);
            pending.emplace_back(node->left, row + 1, col - 1);
        }
        // Rows read top to bottom and values break the ties of nodes sharing
        // one cell; map order runs the columns left to right.
        vector<vector<int>> answer;
        answer.reserve(cells.size());
        for (auto &[col, records] : cells) {
            sort(records.begin(), records.end());
            vector<int> values;
            values.reserve(records.size());
            for (auto &[row, value] : records) {
                values.push_back(value);
            }
            answer.push_back(move(values));
        }
        return answer;
    }
};
