#pragma once

struct QuadNode {
    bool val;
    bool isLeaf;
    QuadNode *topLeft, *topRight, *bottomLeft, *bottomRight;
    QuadNode(bool v, bool l) : val(v), isLeaf(l), topLeft(nullptr), topRight(nullptr),
        bottomLeft(nullptr), bottomRight(nullptr) {}
    QuadNode(bool v, bool l, QuadNode* tl, QuadNode* tr, QuadNode* bl, QuadNode* br) :
        val(v), isLeaf(l), topLeft(tl), topRight(tr), bottomLeft(bl), bottomRight(br) {}
};
