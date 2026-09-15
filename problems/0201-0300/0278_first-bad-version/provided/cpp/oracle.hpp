// Problem-provided oracle (VersionControl), C++ side. Compiled into the
// judge's wrapper alongside every submission; never editable in the
// editor. Constructed from the case state: the hidden first bad version
// as one generic OjValue, then the query budget.
#pragma once

class VersionControl {
public:
    VersionControl(const OjValue& bad, long long budget) : budget_(budget) {
        if (bad.kind != OjValue::Int) throw std::runtime_error("VersionControl bad must be an integer");
        bad_ = bad.integer;
    }

    bool isBadVersion(int version) {
        if (budget_ <= 0) throw std::runtime_error("VersionControl query budget exhausted");
        budget_ -= 1;
        return version >= bad_;
    }

private:
    long long bad_;
    long long budget_;
};
