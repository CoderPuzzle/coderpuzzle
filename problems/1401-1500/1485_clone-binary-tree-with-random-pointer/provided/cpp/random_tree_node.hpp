struct RandomTreeNode {
  int val;
  RandomTreeNode *left;
  RandomTreeNode *right;
  RandomTreeNode *random;
  RandomTreeNode() : val(0), left(nullptr), right(nullptr), random(nullptr) {}
  explicit RandomTreeNode(int x) : val(x), left(nullptr), right(nullptr), random(nullptr) {}
  RandomTreeNode(int x, RandomTreeNode *l, RandomTreeNode *r, RandomTreeNode *q)
      : val(x), left(l), right(r), random(q) {}
};
