// Problem-provided oracle (Robot), C++ side. Compiled into the
// judge's wrapper alongside every submission; never editable in the
// editor. Constructed from the case state: the room grid and the start
// cell as generic OjValues, then the operation budget.
#pragma once

class Robot {
public:
    Robot(const OjValue& room, const OjValue& start, long long budget) : budget_(budget) {
        if (room.kind != OjValue::Array) throw std::runtime_error("Robot room must be an array");
        rows_ = static_cast<int>(room.items.size());
        cols_ = 0;
        for (const OjValue& rowValue : room.items) {
            if (rowValue.kind != OjValue::Array) throw std::runtime_error("Robot room rows must be arrays");
            std::vector<int> cells;
            cells.reserve(rowValue.items.size());
            for (const OjValue& cell : rowValue.items) {
                if (cell.kind != OjValue::Int) throw std::runtime_error("Robot room cells must be integers");
                cells.push_back(static_cast<int>(cell.integer));
            }
            cols_ = std::max(cols_, static_cast<int>(cells.size()));
            room_.push_back(std::move(cells));
        }
        for (auto& rowCells : room_) rowCells.resize(cols_, 0);
        if (start.kind != OjValue::Array || start.items.size() != 2
            || start.items[0].kind != OjValue::Int || start.items[1].kind != OjValue::Int) {
            throw std::runtime_error("Robot start must be a pair of integers");
        }
        row_ = static_cast<int>(start.items[0].integer);
        col_ = static_cast<int>(start.items[1].integer);
        face_ = 0; // starts facing up
        clean();
    }

    bool move() {
        spend();
        static const int kDirections[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}}; // up, right, down, left
        int nr = row_ + kDirections[face_][0];
        int nc = col_ + kDirections[face_][1];
        if (nr < 0 || nr >= rows_ || nc < 0 || nc >= cols_ || room_[nr][nc] == 0) {
            return false; // wall or blocked cell: stays in place
        }
        row_ = nr;
        col_ = nc;
        return true;
    }

    void turnLeft() {
        spend();
        face_ = (face_ + 3) % 4;
    }

    void turnRight() {
        spend();
        face_ = (face_ + 1) % 4;
    }

    void clean() {
        spend();
        cleaned_.insert({row_, col_});
    }

    OjValue verdict() const {
        OjValue out;
        out.kind = OjValue::Array;
        out.items.reserve(cleaned_.size());
        for (const auto& cell : cleaned_) {
            OjValue pair;
            pair.kind = OjValue::Array;
            OjValue first;
            first.kind = OjValue::Int;
            first.integer = cell.first;
            pair.items.push_back(first);
            OjValue second;
            second.kind = OjValue::Int;
            second.integer = cell.second;
            pair.items.push_back(second);
            out.items.push_back(std::move(pair));
        }
        return out;
    }

private:
    void spend() {
        if (budget_ <= 0) throw std::runtime_error("Robot operation budget exhausted");
        budget_ -= 1;
    }

    std::vector<std::vector<int>> room_;
    int rows_ = 0;
    int cols_ = 0;
    int row_ = 0;
    int col_ = 0;
    int face_ = 0;
    std::set<std::pair<int, int>> cleaned_;
    long long budget_;
};
