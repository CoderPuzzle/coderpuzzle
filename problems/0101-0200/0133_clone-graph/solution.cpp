class Solution {
  public:
    GraphNode *cloneGraph(GraphNode *node) {
        if (node == nullptr)
            return nullptr;
        std::unordered_map<GraphNode *, GraphNode *> created;
        created[node] = new GraphNode(node->val);
        vector<GraphNode *> stack{node};
        while (!stack.empty()) {
            GraphNode *current = stack.back();
            stack.pop_back();
            for (GraphNode *neighbor : current->neighbors) {
                if (!created.contains(neighbor)) {
                    created[neighbor] = new GraphNode(neighbor->val);
                    stack.push_back(neighbor);
                }
                created[current]->neighbors.push_back(created[neighbor]);
            }
        }
        return created[node];
    }
};
