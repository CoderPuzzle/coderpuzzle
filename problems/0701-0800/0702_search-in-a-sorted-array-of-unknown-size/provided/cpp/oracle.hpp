// Problem-provided oracle (ArrayReader), C++ side. Compiled into the
// judge's wrapper alongside every submission; never editable in the
// editor. Constructed from the case state: the hidden values as one
// generic OjValue, then the query budget.
#pragma once

class ArrayReader {
public:
    static constexpr long long SENTINEL = 2147483647LL;

    ArrayReader(const OjValue& values, long long budget) : budget_(budget) {
        if (values.kind != OjValue::Array) throw std::runtime_error("ArrayReader values must be an array");
        arr_.reserve(values.items.size());
        for (const OjValue& item : values.items) {
            if (item.kind != OjValue::Int) throw std::runtime_error("ArrayReader values must be integers");
            arr_.push_back(static_cast<int>(item.integer));
        }
    }

    int get(int index) {
        if (budget_ <= 0) throw std::runtime_error("ArrayReader query budget exhausted");
        budget_ -= 1;
        if (index >= 0 && index < static_cast<int>(arr_.size())) return arr_[index];
        return static_cast<int>(SENTINEL);
    }

private:
    std::vector<int> arr_;
    long long budget_;
};
