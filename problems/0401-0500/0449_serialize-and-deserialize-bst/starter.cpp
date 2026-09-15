class Codec {
  public:
    Codec();
    string serialize(TreeNode *root);
    TreeNode *deserialize(string data);
};
