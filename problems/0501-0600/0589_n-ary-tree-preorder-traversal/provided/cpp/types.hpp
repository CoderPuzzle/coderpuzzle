#pragma once

#include <vector>

struct Node {
    int val;
    std::vector<Node*> children;
    explicit Node(int x) : val(x) {}
};
