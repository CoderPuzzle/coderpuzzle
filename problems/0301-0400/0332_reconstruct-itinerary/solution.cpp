class Solution {
  public:
    vector<string> findItinerary(vector<vector<string>> &tickets) {
        map<string, vector<string>> graph;
        for (const auto &ticket : tickets) {
            graph[ticket[0]].push_back(ticket[1]);
        }
        for (auto &[airport, adj] : graph) {
            (void)airport;
            sort(adj.rbegin(), adj.rend()); // descending
        }

        // Iterative Hierholzer: always take the lexicographically smallest
        // unused ticket (last element of the descending-sorted list).
        vector<string> route;
        vector<string> stack;
        stack.push_back("JFK");
        while (!stack.empty()) {
            string airport = stack.back();
            auto it = graph.find(airport);
            if (it != graph.end() && !it->second.empty()) {
                vector<string> &adj = it->second;
                stack.push_back(adj.back());
                adj.pop_back();
            } else {
                // No unused edges left: emit in postorder so dead-end
                // airports land at their latest possible position.
                route.push_back(airport);
                stack.pop_back();
            }
        }
        reverse(route.begin(), route.end());
        return route;
    }
};
