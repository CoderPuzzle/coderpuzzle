class BSTIterator {
  public:
    BSTIterator(TreeNode *root);
    bool hasNext();
    int next();
    bool hasPrev();
    int prev();
};
