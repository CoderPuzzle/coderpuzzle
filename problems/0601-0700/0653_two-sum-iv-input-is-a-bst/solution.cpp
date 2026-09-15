#include <unordered_set>
#include <vector>

class Solution {
  public:
    bool findTarget(TreeNode *root, int k) {
        // A value pairs with k minus itself, so the whole question is set
        // membership: keep every value already visited in a hash set, and
        // each new node learns with one lookup whether its partner came
        // earlier. The lookup comes before the insert — the ordering that
        // forbids a node pairing with itself, so a k equal to twice a
        // value that occurs once stays false. The visiting order is
        // irrelevant: any traversal that reaches every node sees one
        // member of a summing pair before the other, so a plain preorder
        // returns true at the first hit and false only after the whole
        // tree is exhausted. The walk carries its own stack of nodes: the
        // tree may be a single 10^4-node chain, whose walk would nest
        // 10000 calls — needlessly at the mercy of the runtime call
        // stack.
        unordered_set<int> seen;
        vector<TreeNode *> stack{root};
        while (!stack.empty()) {
            TreeNode *node = stack.back();
            stack.pop_back();
            if (seen.count(k - node->val) > 0)
                return true;
            seen.insert(node->val);
            if (node->left != nullptr)
                stack.push_back(node->left);
            if (node->right != nullptr)
                stack.push_back(node->right);
        }
        return false;
    }
};
