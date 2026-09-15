// Problem-provided oracle (ArrayReader), C++ side. Compiled into the
// judge's wrapper alongside every submission; never editable in the
// editor. Constructed from the case state: the hidden array as one
// generic OjValue, then the query budget.
#pragma once

class ArrayReader {
public:
    ArrayReader(const OjValue& arr, long long budget) : budget_(budget) {
        if (arr.kind != OjValue::Array) throw std::runtime_error("ArrayReader arr must be an array");
        values_.reserve(arr.items.size());
        for (const OjValue& entry : arr.items) {
            if (entry.kind != OjValue::Int) throw std::runtime_error("ArrayReader entries must be integers");
            values_.push_back(entry.integer);
        }
    }

    int compareSub(int l, int r, int x, int y) {
        if (budget_ <= 0) throw std::runtime_error("ArrayReader query budget exhausted");
        budget_ -= 1;
        long long left = 0;
        for (int i = l; i <= r; ++i) left += values_[i];
        long long right = 0;
        for (int i = x; i <= y; ++i) right += values_[i];
        if (left > right) return 1;
        if (left < right) return -1;
        return 0;
    }

    int length() const {
        return static_cast<int>(values_.size());
    }

private:
    std::vector<long long> values_;
    long long budget_;
};
