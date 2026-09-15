class Solution {
  public:
    long long countPairs(int n, vector<vector<int>> &edges) {
        // components answer the question: all C(n, 2) pairs minus the pairs
        // inside one component, so enumerate each component exactly once
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            // an undirected edge is walkable both ways, so each endpoint
            // records the other as a neighbour
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        vector<char> visited(n, 0);
        // a flat vector with a read cursor serves as the queue: push_back is
        // the push, the advancing cursor the pop. The walk is iterative end
        // to end -- recursive DFS would smash the stack on one long component
        vector<int> queue;
        queue.reserve(n);
        // the count can approach 5*10^9 for n = 10^5, hence the long long
        long long reachable = 0;
        for (int seed = 0; seed < n; seed++) {
            if (visited[seed]) {
                continue;
            }
            visited[seed] = 1;
            queue.clear();
            queue.push_back(seed);
            // marking a node when it is enqueued, not when it is dequeued,
            // keeps every node in the queue exactly once
            for (size_t head = 0; head < queue.size(); head++) {
                for (int v : adj[queue[head]]) {
                    if (!visited[v]) {
                        visited[v] = 1;
                        queue.push_back(v);
                    }
                }
            }
            // the queue now holds precisely this component: its size*(size-1)/2
            // internal pairs are exactly the reachable pairs it contributes
            long long size = (long long)queue.size();
            reachable += size * (size - 1) / 2;
        }
        // whatever remains of C(n, 2) counts each unreachable pair once
        return (long long)n * (n - 1) / 2 - reachable;
    }
};
