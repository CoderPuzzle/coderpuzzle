#pragma once

struct MultiListNode {
    int val;
    MultiListNode *prev, *next, *child;
    explicit MultiListNode(int x) : val(x), prev(nullptr), next(nullptr),
        child(nullptr) {}
};
