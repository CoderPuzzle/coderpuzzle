// Problem-provided oracle (CommonBits), C++ side. Compiled into the
// judge's wrapper alongside every submission; never editable in the
// editor. Constructed from the case state: the initial hidden number as
// one generic OjValue, then the query budget.
#pragma once

class CommonBits {
public:
    CommonBits(const OjValue& value, long long budget) : budget_(budget) {
        if (value.kind != OjValue::Int) throw std::runtime_error("CommonBits n must be an integer");
        n_ = static_cast<int>(value.integer);
    }

    int commonBits(int num) {
        if (budget_ <= 0) throw std::runtime_error("CommonBits query budget exhausted");
        budget_ -= 1;
        int diff = (n_ ^ num) & ((1 << 30) - 1);
        n_ ^= num;
        return 30 - __builtin_popcount(diff);
    }

private:
    int n_;
    long long budget_;
};
