struct GraphNode {
  int val;
  std::vector<GraphNode *> neighbors;
  GraphNode() : val(0), neighbors() {}
  explicit GraphNode(int x) : val(x), neighbors() {}
  GraphNode(int x, std::vector<GraphNode *> n)
      : val(x), neighbors(std::move(n)) {}
};
