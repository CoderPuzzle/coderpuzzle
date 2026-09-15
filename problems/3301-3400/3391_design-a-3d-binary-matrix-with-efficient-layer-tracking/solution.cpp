#include <functional>
#include <queue>
#include <utility>
#include <vector>

// Layer one-counts live in an array beside a max-heap of (count, x)
// pairs; every count change pushes a fresh pair, so the top always
// holds the largest live count with ties broken toward the larger
// index, and pairs left stale by later changes are discarded only when
// they surface at the top. The cell grid answers set and unset in O(1)
// and keeps repeated sets or unsets from skewing the counts. Each call
// costs O(log) heap work.
class Matrix3D {
  public:
    Matrix3D(int n) : counts(n, 0), cells(n, vector<vector<char>>(n, vector<char>(n, 0))) {
        for (int x = 0; x < n; ++x)
            heap.push({0, -x});
    }

    void setCell(int x, int y, int z) {
        if (cells[x][y][z])
            return;
        cells[x][y][z] = 1;
        ++counts[x];
        heap.push({-counts[x], -x});
    }

    void unsetCell(int x, int y, int z) {
        if (!cells[x][y][z])
            return;
        cells[x][y][z] = 0;
        --counts[x];
        heap.push({-counts[x], -x});
    }

    int largestMatrix() {
        // The live pair of the true maximum is always present, so the
        // stale entries above it run out.
        while (heap.top().first != -counts[-heap.top().second])
            heap.pop();
        return -heap.top().second;
    }

  private:
    vector<int> counts;
    vector<vector<vector<char>>> cells;
    // Negated pairs under greater<>: the top is the largest count,
    // ties broken toward the largest index.
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> heap;
};
