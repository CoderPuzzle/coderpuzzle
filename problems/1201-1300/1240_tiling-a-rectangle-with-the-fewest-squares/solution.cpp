class Solution {
  public:
    int tilingRectangle(int n, int m) {
        n_ = n;
        m_ = m;
        heights_.assign(m, 0);
        best_ = n * m; // the all-1x1 tiling is always available
        backtrack(0);
        return best_;
    }

  private:
    int n_, m_;
    vector<int> heights_;
    int best_;

    void backtrack(int count) {
        if (count >= best_)
            return;
        int column = findHole();
        if (heights_[column] == n_) {
            best_ = count; // every column full
            return;
        }
        // Largest side first: finds a strong incumbent early.
        int maxSide = min(n_ - heights_[column], m_ - column);
        for (int side = maxSide; side >= 1; --side) {
            if (!canPlace(column, side))
                continue;
            for (int c = column; c < column + side; ++c)
                heights_[c] += side;
            backtrack(count + 1);
            for (int c = column; c < column + side; ++c)
                heights_[c] -= side;
        }
    }

    // The first column whose top is lowest names the next uncovered cell.
    int findHole() {
        int column = 0;
        for (int c = 1; c < m_; ++c) {
            if (heights_[c] < heights_[column])
                column = c;
        }
        return column;
    }

    bool canPlace(int column, int side) {
        for (int c = column; c < column + side; ++c) {
            if (heights_[c] != heights_[column])
                return false;
        }
        return true;
    }
};
