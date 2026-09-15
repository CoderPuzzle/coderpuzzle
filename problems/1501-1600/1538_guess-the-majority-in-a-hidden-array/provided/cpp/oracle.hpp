// Problem-provided oracle (ArrayReader), C++ side. Compiled into the
// judge's wrapper alongside every submission; never editable in the
// editor. Constructed from the case state: the hidden binary array as
// one generic OjValue. The oracle enforces the problem's own 2n query
// budget itself, independent of whatever budget the harness supplies.
#pragma once

class ArrayReader {
public:
    ArrayReader(const OjValue& values, long long) {
        if (values.kind != OjValue::Array) throw std::runtime_error("ArrayReader values must be an array");
        nums_.reserve(values.items.size());
        for (const OjValue& item : values.items) {
            if (item.kind != OjValue::Int) throw std::runtime_error("ArrayReader values must be integers");
            nums_.push_back(static_cast<int>(item.integer));
        }
        budget_ = 2LL * static_cast<long long>(nums_.size());
    }

    int query(int a, int b, int c, int d) {
        if (budget_ <= 0) throw std::runtime_error("ArrayReader query budget exhausted");
        budget_ -= 1;
        int ones = nums_[a] + nums_[b] + nums_[c] + nums_[d];
        if (ones == 0 || ones == 4) return 4;
        if (ones == 1 || ones == 3) return 2;
        return 0;
    }

    int length() const { return static_cast<int>(nums_.size()); }

private:
    std::vector<int> nums_;
    long long budget_;
};
