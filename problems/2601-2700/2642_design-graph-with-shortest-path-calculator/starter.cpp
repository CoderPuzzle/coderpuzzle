class Graph {
  public:
    Graph(int n, vector<vector<int>> edges);
    void addEdge(vector<int> edge);
    int shortestPath(int node1, int node2);
};
