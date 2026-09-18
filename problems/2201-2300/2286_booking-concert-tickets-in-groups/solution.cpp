#include <vector>

class BookMyShow {
  public:
    BookMyShow(int n, int m) : n(n), m(m), remaining(n, m), sums(4 * n, 0), maxs(4 * n, 0) {
        if (n > 0) {
            build(1, 0, n - 1);
        }
    }

    std::vector<int> gather(int k, int lastRow) {
        int row = firstAtLeast(1, 0, n - 1, 0, lastRow, k);
        if (row == -1) {
            return {};
        }
        int column = m - remaining[row];
        update(1, 0, n - 1, row, remaining[row] - k);
        return {row, column};
    }

    bool scatter(int k, int lastRow) {
        if (rangeSum(1, 0, n - 1, 0, lastRow) < k) {
            return false;
        }
        int row = 0;
        while (k > 0) {
            row = firstAtLeast(1, 0, n - 1, row, lastRow, 1);
            int take = std::min(remaining[row], k);
            k -= take;
            update(1, 0, n - 1, row, remaining[row] - take);
            row++;
        }
        return true;
    }

  private:
    void build(int node, int lo, int hi) {
        if (lo == hi) {
            sums[node] = remaining[lo];
            maxs[node] = remaining[lo];
            return;
        }
        int mid = (lo + hi) / 2;
        build(2 * node, lo, mid);
        build(2 * node + 1, mid + 1, hi);
        pull(node);
    }

    void pull(int node) {
        sums[node] = sums[2 * node] + sums[2 * node + 1];
        maxs[node] = std::max(maxs[2 * node], maxs[2 * node + 1]);
    }

    void update(int node, int lo, int hi, int index, int value) {
        if (lo == hi) {
            remaining[index] = value;
            sums[node] = value;
            maxs[node] = value;
            return;
        }
        int mid = (lo + hi) / 2;
        if (index <= mid) {
            update(2 * node, lo, mid, index, value);
        } else {
            update(2 * node + 1, mid + 1, hi, index, value);
        }
        pull(node);
    }

    long long rangeSum(int node, int lo, int hi, int left, int right) {
        if (right < lo || hi < left) {
            return 0;
        }
        if (left <= lo && hi <= right) {
            return sums[node];
        }
        int mid = (lo + hi) / 2;
        return rangeSum(2 * node, lo, mid, left, right) + rangeSum(2 * node + 1, mid + 1, hi, left, right);
    }

    // Smallest index in [left, right] with remaining >= k, or -1.
    int firstAtLeast(int node, int lo, int hi, int left, int right, int k) {
        if (right < lo || hi < left || maxs[node] < k) {
            return -1;
        }
        if (lo == hi) {
            return lo;
        }
        int mid = (lo + hi) / 2;
        int found = firstAtLeast(2 * node, lo, mid, left, right, k);
        if (found != -1) {
            return found;
        }
        return firstAtLeast(2 * node + 1, mid + 1, hi, left, right, k);
    }

    int n;
    int m;
    std::vector<int> remaining; // free seats left per row
    std::vector<long long> sums;
    std::vector<int> maxs;
};
