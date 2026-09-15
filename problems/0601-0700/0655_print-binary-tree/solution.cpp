#include <string>
#include <tuple>
#include <utility>
#include <vector>

class Solution {
  public:
    vector<vector<string>> printTree(TreeNode *root) {
        // The layout is pinned before any cell is written: rows = height + 1,
        // columns = 2^(height+1) - 1, children stepping 2^(height-r-1) columns
        // sideways of their parent. So a first pass measures the tree's
        // height — in edges, the unit the formulas are stated in — on an
        // explicit stack: the placement formulas consume it, so guessing it
        // wrong would shift every cell in the grid.
        int height = 0;
        vector<pair<TreeNode *, int>> measure;
        measure.push_back({root, 0});
        while (!measure.empty()) {
            auto [node, depth] = measure.back();
            measure.pop_back();
            if (depth > height) {
                height = depth;
            }
            if (node->left != nullptr) {
                measure.push_back({node->left, depth + 1});
            }
            if (node->right != nullptr) {
                measure.push_back({node->right, depth + 1});
            }
        }
        // Second pass: the grid is born as every cell "", the root goes to
        // the exact middle of the top row, and untouched cells simply keep
        // their "" — the empties are the layout: the matrix is as wide as
        // the deepest path alone, not as the node count.
        int rows = height + 1;
        int cols = (1 << (height + 1)) - 1;
        vector<vector<string>> res(rows, vector<string>(cols, ""));
        vector<tuple<TreeNode *, int, int>> place;
        place.push_back({root, 0, (cols - 1) / 2});
        while (!place.empty()) {
            auto [node, r, c] = place.back();
            place.pop_back();
            res[r][c] = to_string(node->val);
            if (node->left != nullptr || node->right != nullptr) {
                // An internal node always sits above the last row, so the
                // exponent height - r - 1 is never negative.
                int offset = 1 << (height - r - 1);
                if (node->left != nullptr) {
                    place.push_back({node->left, r + 1, c - offset});
                }
                if (node->right != nullptr) {
                    place.push_back({node->right, r + 1, c + offset});
                }
            }
        }
        return res;
    }
};
