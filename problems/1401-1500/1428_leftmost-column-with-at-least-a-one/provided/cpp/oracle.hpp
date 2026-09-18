// Problem-provided oracle (BinaryMatrix), C++ side. Compiled into the
// judge's wrapper alongside every submission; never editable in the
// editor. Constructed from the case state: the hidden grid rows as one
// generic OjValue, then the query budget.
#pragma once

class BinaryMatrix {
public:
    BinaryMatrix(const OjValue& rows, long long budget) : budget_(budget) {
        if (rows.kind != OjValue::Array) throw std::runtime_error("BinaryMatrix rows must be an array");
        rows_.reserve(rows.items.size());
        for (const OjValue& row : rows.items) {
            if (row.kind != OjValue::Array) throw std::runtime_error("BinaryMatrix rows must be arrays");
            std::vector<int> values;
            values.reserve(row.items.size());
            for (const OjValue& entry : row.items) {
                if (entry.kind != OjValue::Int) throw std::runtime_error("BinaryMatrix entries must be integers");
                values.push_back(static_cast<int>(entry.integer));
            }
            rows_.push_back(std::move(values));
        }
    }

    int get(int row, int col) {
        if (budget_ <= 0) throw std::runtime_error("BinaryMatrix query budget exhausted");
        budget_ -= 1;
        return rows_[row][col];
    }

    std::vector<int> dimensions() {
        int cols = rows_.empty() ? 0 : static_cast<int>(rows_.front().size());
        return { static_cast<int>(rows_.size()), cols };
    }

private:
    std::vector<std::vector<int>> rows_;
    long long budget_;
};
