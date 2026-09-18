// Problem-provided oracle (MountainArray), C++ side. Compiled into the
// judge's wrapper alongside every submission; never editable in the
// editor. Constructed from the case state: the sequence's values as one
// generic OjValue, then the query budget.
#pragma once

class MountainArray {
public:
    MountainArray(const OjValue& values, long long budget) : budget_(budget) {
        if (values.kind != OjValue::Array) throw std::runtime_error("MountainArray values must be an array");
        values_.reserve(values.items.size());
        for (const OjValue& item : values.items) {
            if (item.kind != OjValue::Int) throw std::runtime_error("MountainArray values must be integers");
            values_.push_back(static_cast<int>(item.integer));
        }
    }

    int get(int index) {
        if (budget_ <= 0) throw std::runtime_error("MountainArray query budget exhausted");
        budget_ -= 1;
        if (index < 0 || index >= static_cast<int>(values_.size())) throw std::runtime_error("MountainArray index out of range");
        return values_[index];
    }

    int length() const {
        return static_cast<int>(values_.size());
    }

private:
    std::vector<int> values_;
    long long budget_;
};
