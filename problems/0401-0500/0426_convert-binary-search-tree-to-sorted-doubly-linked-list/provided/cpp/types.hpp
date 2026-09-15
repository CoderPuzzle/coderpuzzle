#pragma once

struct NodeWithNext {
    int val;
    NodeWithNext *left, *right, *next, *parent;
    explicit NodeWithNext(int x) : val(x), left(nullptr), right(nullptr),
        next(nullptr), parent(nullptr) {}
};
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    explicit TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
