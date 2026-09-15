// Problem-provided oracle (HiddenNumber), C++ side. Compiled into the
// judge's wrapper alongside every submission; never editable in the
// editor. Constructed from the case state: the hidden number as one
// generic OjValue, then the query budget.
#pragma once

class HiddenNumber {
public:
    HiddenNumber(const OjValue& n, long long budget) : budget_(budget) {
        if (n.kind != OjValue::Int) throw std::runtime_error("HiddenNumber n must be an integer");
        n_ = n.integer;
    }

    int commonSetBits(int num) {
        if (budget_ <= 0) throw std::runtime_error("HiddenNumber query budget exhausted");
        budget_ -= 1;
        int count = 0;
        for (unsigned int shared = static_cast<unsigned int>(n_) & static_cast<unsigned int>(num);
             shared != 0; shared >>= 1) {
            count += static_cast<int>(shared & 1u);
        }
        return count;
    }

private:
    long long n_;
    long long budget_;
};
