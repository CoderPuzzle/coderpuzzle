#include <algorithm>
#include <tuple>
#include <vector>

class Solution {
  public:
    vector<vector<int>> verticalOrder(TreeNode *root) {
        // Pure collector: a root-first DFS (left before right) appends one
        // (column, row, value) record per node and defers all ordering to a
        // single sort afterwards.
        vector<tuple<int, int, int>> triples;
        walk(root, 0, 0, triples);
        // stable_sort is the load-bearing choice: the key stops at
        // (column, row), so within one cell the records keep their walk
        // order, and a left-before-right walk visits same-depth nodes
        // exactly in the statement's left-to-right reading order — the
        // value must not take part.
        stable_sort(triples.begin(), triples.end(), [](const auto &a, const auto &b) {
            if (get<0>(a) != get<0>(b)) {
                return get<0>(a) < get<0>(b);
            }
            return get<1>(a) < get<1>(b);
        });
        vector<vector<int>> answer;
        for (size_t index = 0; index < triples.size(); ++index) {
            if (index == 0 || get<0>(triples[index]) != get<0>(triples[index - 1])) {
                answer.push_back({});
            }
            answer.back().push_back(get<2>(triples[index]));
        }
        return answer;
    }

  private:
    static void walk(const TreeNode *node, int row, int col, vector<tuple<int, int, int>> &triples) {
        if (node == nullptr) {
            return;
        }
        triples.emplace_back(col, row, node->val);
        walk(node->left, row + 1, col - 1, triples);
        walk(node->right, row + 1, col + 1, triples);
    }
};
