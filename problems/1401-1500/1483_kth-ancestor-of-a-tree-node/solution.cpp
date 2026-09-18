#include <vector>

class TreeAncestor {
  public:
    TreeAncestor(int n, std::vector<int> parent) : levels(1), up(1, std::move(parent)) {
        while ((1 << levels) <= n) {
            levels++;
        }
        up.resize(levels);
        for (int j = 1; j < levels; j++) {
            const std::vector<int> &previous = up[j - 1];
            up[j].assign(n, -1);
            for (int v = 0; v < n; v++) {
                int middle = previous[v];
                if (middle >= 0) {
                    up[j][v] = previous[middle];
                }
            }
        }
    }

    int getKthAncestor(int node, int k) {
        if (k >= 1 << levels) {
            return -1;
        }
        for (int level = 0; k != 0 && node >= 0; level++, k >>= 1) {
            if (k & 1) {
                node = up[level][node];
            }
        }
        return node;
    }

  private:
    int levels;
    std::vector<std::vector<int>> up;
};
