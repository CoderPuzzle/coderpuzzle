#include <deque>
#include <unordered_map>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    TreeNode *correctBinaryTree(TreeNode *root, int fromNode, int toNode) {
        // The tree arrives clean — the defect exists only after the
        // custom-testing step — so the first walk rebuilds it: every node
        // recorded by value, the fromNode node's empty right slot pointed
        // at the toNode node. The correction is a breadth-first sweep that
        // takes each level right to left, marking nodes seen on enqueue and
        // carrying each node's parent alongside it. toNode sits right of
        // fromNode on the same depth, so by the time fromNode is dequeued
        // its right child is already seen — and no other node can pass
        // that test, because in a tree every child is enqueued exactly
        // once, by its own parent; only the wired edge breaks that.
        unordered_map<int, TreeNode *> byValue;
        vector<TreeNode *> walk{root};
        while (!walk.empty()) {
            TreeNode *node = walk.back();
            walk.pop_back();
            if (node == nullptr) {
                continue;
            }
            byValue[node->val] = node;
            walk.push_back(node->left);
            walk.push_back(node->right);
        }
        byValue[fromNode]->right = byValue[toNode];
        struct Frame {
            TreeNode *node;
            TreeNode *parent;
        };
        unordered_set<TreeNode *> seen{root};
        deque<Frame> pending{{root, nullptr}};
        while (!pending.empty()) {
            Frame frame = pending.front();
            pending.pop_front();
            if (frame.node->right != nullptr && seen.count(frame.node->right) > 0) {
                // detach the offender through the parent beside it
                if (frame.parent->left == frame.node) {
                    frame.parent->left = nullptr;
                } else {
                    frame.parent->right = nullptr;
                }
                return root;
            }
            if (frame.node->right != nullptr) {
                seen.insert(frame.node->right);
                pending.push_back({frame.node->right, frame.node});
            }
            if (frame.node->left != nullptr) {
                seen.insert(frame.node->left);
                pending.push_back({frame.node->left, frame.node});
            }
        }
        return root;
    }
};
