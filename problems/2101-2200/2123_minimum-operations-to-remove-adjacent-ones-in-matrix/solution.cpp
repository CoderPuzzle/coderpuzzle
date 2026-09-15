class Solution {
  public:
    int minimumOperations(vector<vector<int>> &grid) {
        int rows = grid.size();
        int columns = grid[0].size();
        int total = rows * columns;
        vector<vector<int>> adjacency(total);
        vector<int> leftVertices;
        const int directions[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        for (int row = 0; row < rows; ++row) {
            for (int column = 0; column < columns; ++column) {
                if (grid[row][column] == 0 || (row + column) % 2 == 1)
                    continue;
                int vertex = row * columns + column;
                leftVertices.push_back(vertex);
                for (const auto &direction : directions) {
                    int nr = row + direction[0];
                    int nc = column + direction[1];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < columns && grid[nr][nc] == 1) {
                        adjacency[vertex].push_back(nr * columns + nc);
                    }
                }
            }
        }

        vector<int> pairLeft(total, -1);
        vector<int> pairRight(total, -1);
        vector<int> distance(total);
        vector<int> stack(total);
        vector<int> pathEdges(total);
        int infinity = total + 1;
        int matching = 0;
        while (true) {
            int shortest = layer(leftVertices, adjacency, pairLeft, pairRight, distance, infinity);
            if (shortest == infinity)
                break;
            vector<int> nextEdge(total);
            for (int vertex : leftVertices) {
                if (pairLeft[vertex] == -1 && augment(vertex, shortest, adjacency, pairLeft, pairRight, distance,
                                                      infinity, nextEdge, stack, pathEdges)) {
                    ++matching;
                }
            }
        }
        return matching;
    }

  private:
    int layer(const vector<int> &leftVertices, const vector<vector<int>> &adjacency, const vector<int> &pairLeft,
              const vector<int> &pairRight, vector<int> &distance, int infinity) {
        queue<int> pending;
        for (int vertex : leftVertices) {
            if (pairLeft[vertex] == -1) {
                distance[vertex] = 0;
                pending.push(vertex);
            } else {
                distance[vertex] = infinity;
            }
        }
        int shortest = infinity;
        while (!pending.empty()) {
            int vertex = pending.front();
            pending.pop();
            if (distance[vertex] >= shortest)
                continue;
            for (int neighbor : adjacency[vertex]) {
                int mate = pairRight[neighbor];
                if (mate == -1)
                    shortest = distance[vertex] + 1;
                else if (distance[mate] == infinity) {
                    distance[mate] = distance[vertex] + 1;
                    pending.push(mate);
                }
            }
        }
        return shortest;
    }

    bool augment(int root, int shortest, const vector<vector<int>> &adjacency, vector<int> &pairLeft,
                 vector<int> &pairRight, vector<int> &distance, int infinity, vector<int> &nextEdge, vector<int> &stack,
                 vector<int> &pathEdges) {
        int size = 1;
        stack[0] = root;
        while (size > 0) {
            int vertex = stack[size - 1];
            if (nextEdge[vertex] == static_cast<int>(adjacency[vertex].size())) {
                distance[vertex] = infinity;
                --size;
                continue;
            }
            int neighbor = adjacency[vertex][nextEdge[vertex]++];
            int mate = pairRight[neighbor];
            if (mate == -1) {
                if (distance[vertex] + 1 != shortest)
                    continue;
                pairLeft[vertex] = neighbor;
                pairRight[neighbor] = vertex;
                for (int level = size - 2; level >= 0; --level) {
                    int parent = stack[level];
                    int edge = pathEdges[level];
                    pairLeft[parent] = edge;
                    pairRight[edge] = parent;
                }
                return true;
            }
            if (distance[mate] == distance[vertex] + 1) {
                pathEdges[size - 1] = neighbor;
                stack[size++] = mate;
            }
        }
        return false;
    }
};
