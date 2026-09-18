// Problem-provided oracle (GridMaster), C++ side. Compiled into the
// judge's wrapper alongside every submission; never editable in the
// editor. Constructed from the case state: the grid, the start cell and
// the goal cell as generic OjValues, then the query budget.
#pragma once

class GridMaster {
public:
    GridMaster(const OjValue& grid, const OjValue& start, const OjValue& goal, long long budget)
        : budget_(budget) {
        if (grid.kind != OjValue::Array) throw std::runtime_error("GridMaster grid must be an array");
        rows_ = static_cast<int>(grid.items.size());
        cols_ = 0;
        cost_.assign(rows_, std::vector<int>());
        for (int r = 0; r < rows_; ++r) {
            const OjValue& row = grid.items[r];
            if (row.kind != OjValue::Array) throw std::runtime_error("GridMaster grid rows must be arrays");
            cost_[r].reserve(row.items.size());
            for (const OjValue& cell : row.items) {
                if (cell.kind != OjValue::Int) throw std::runtime_error("GridMaster grid cells must be integers");
                cost_[r].push_back(static_cast<int>(cell.integer));
            }
            cols_ = std::max(cols_, static_cast<int>(cost_[r].size()));
        }
        if (start.kind != OjValue::Array || start.items.size() < 2) {
            throw std::runtime_error("GridMaster start must be [row, col]");
        }
        row_ = static_cast<int>(start.items[0].integer);
        col_ = static_cast<int>(start.items[1].integer);
        if (goal.kind != OjValue::Array || goal.items.size() < 2) {
            throw std::runtime_error("GridMaster goal must be [row, col]");
        }
        goalRow_ = static_cast<int>(goal.items[0].integer);
        goalCol_ = static_cast<int>(goal.items[1].integer);
    }

    bool canMove(const std::string& direction) {
        spend();
        auto [dr, dc] = delta(direction);
        return enterable(row_ + dr, col_ + dc);
    }

    int move(const std::string& direction) {
        spend();
        auto [dr, dc] = delta(direction);
        int r = row_ + dr;
        int c = col_ + dc;
        if (!enterable(r, c)) return -1;
        row_ = r;
        col_ = c;
        return cost_[r][c];
    }

    bool isTarget() {
        spend();
        return row_ == goalRow_ && col_ == goalCol_;
    }

private:
    std::vector<std::vector<int>> cost_;
    int rows_ = 0;
    int cols_ = 0;
    int row_ = 0;
    int col_ = 0;
    int goalRow_ = 0;
    int goalCol_ = 0;
    long long budget_;

    void spend() {
        if (budget_ <= 0) throw std::runtime_error("GridMaster query budget exhausted");
        budget_ -= 1;
    }

    static std::pair<int, int> delta(const std::string& direction) {
        if (direction == "U") return {-1, 0};
        if (direction == "D") return {1, 0};
        if (direction == "L") return {0, -1};
        if (direction == "R") return {0, 1};
        throw std::runtime_error("Direction must be one of U, D, L, R");
    }

    bool enterable(int r, int c) const {
        return r >= 0 && r < rows_ && c >= 0 && c < static_cast<int>(cost_[r].size()) && cost_[r][c] > 0;
    }
};
