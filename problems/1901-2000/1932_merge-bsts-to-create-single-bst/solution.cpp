#include <unordered_map>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    TreeNode *canMerge(std::vector<TreeNode *> &trees) {
        // The final root is the unique root value that never appears as a
        // leaf of another tree; duplicate leaf values make merging impossible
        // outright, since a valid BST holds each value exactly once.
        std::unordered_set<int> leaf_seen;
        for (TreeNode *root : trees) {
            for (TreeNode *child : {root->left, root->right}) {
                if (child != nullptr) {
                    if (!leaf_seen.insert(child->val).second) {
                        return nullptr;
                    }
                }
            }
        }
        TreeNode *root = nullptr;
        int candidates = 0;
        for (TreeNode *r : trees) {
            if (leaf_seen.find(r->val) == leaf_seen.end()) {
                root = r;
                ++candidates;
            }
        }
        if (candidates != 1) {
            return nullptr;
        }

        // by_val maps every live node value to its node; splicing a tree in
        // registers the incoming nodes so later trees can chain onto them.
        std::unordered_map<int, TreeNode *> by_val;
        std::vector<TreeNode *> stack{root};
        while (!stack.empty()) {
            TreeNode *nd = stack.back();
            stack.pop_back();
            by_val[nd->val] = nd;
            if (nd->left != nullptr) {
                stack.push_back(nd->left);
            }
            if (nd->right != nullptr) {
                stack.push_back(nd->right);
            }
        }

        std::vector<TreeNode *> pending;
        for (TreeNode *t : trees) {
            if (t != root) {
                pending.push_back(t);
            }
        }
        while (!pending.empty()) {
            std::vector<TreeNode *> rest;
            bool progressed = false;
            for (TreeNode *tree : pending) {
                auto it = by_val.find(tree->val);
                // A host must be a true leaf other than the final root.
                if (it != by_val.end() && it->second != root && it->second->left == nullptr &&
                    it->second->right == nullptr) {
                    TreeNode *host = it->second;
                    host->left = tree->left;
                    host->right = tree->right;
                    std::vector<TreeNode *> sub{tree};
                    while (!sub.empty()) {
                        TreeNode *nd = sub.back();
                        sub.pop_back();
                        by_val[nd->val] = nd;
                        if (nd->left != nullptr) {
                            sub.push_back(nd->left);
                        }
                        if (nd->right != nullptr) {
                            sub.push_back(nd->right);
                        }
                    }
                    progressed = true;
                } else {
                    rest.push_back(tree);
                }
            }
            if (!progressed) {
                return nullptr;
            }
            pending.swap(rest);
        }

        // Validate: strict in-order increase proves BST ordering and that
        // every value is distinct; the distinct-value count proves all n - 1
        // merges actually landed inside one connected tree. Iterative walk,
        // safe at n = 5*10^4.
        long long prev = -1;
        std::unordered_set<int> seen;
        std::vector<TreeNode *> stack2;
        TreeNode *cur = root;
        while (!stack2.empty() || cur != nullptr) {
            while (cur != nullptr) {
                stack2.push_back(cur);
                cur = cur->left;
            }
            cur = stack2.back();
            stack2.pop_back();
            if (prev >= 0 && static_cast<long long>(cur->val) <= prev) {
                return nullptr;
            }
            prev = cur->val;
            seen.insert(cur->val);
            cur = cur->right;
        }
        if (seen.size() != by_val.size()) {
            return nullptr;
        }
        return root;
    }
};
