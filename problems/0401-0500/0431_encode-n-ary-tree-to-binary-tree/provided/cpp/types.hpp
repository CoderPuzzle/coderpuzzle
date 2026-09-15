#pragma once

#include <vector>

struct Node {
    int val;
    std::vector<Node*> children;
    explicit Node(int x) : val(x) {}
};
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    explicit TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
