// Problem-provided oracle (Guess), C++ side. Compiled into the judge's
// wrapper alongside every submission; never editable in the editor.
// Constructed from the case state: the hidden picked number as one
// generic OjValue, then the query budget.
#pragma once

class Guess {
public:
    Guess(const OjValue& pick, long long budget) : budget_(budget) {
        if (pick.kind != OjValue::Int) throw std::runtime_error("Guess pick must be an integer");
        pick_ = pick.integer;
    }

    int guess(int num) {
        if (budget_ <= 0) throw std::runtime_error("Guess query budget exhausted");
        budget_ -= 1;
        if (num > pick_) return -1;
        if (num < pick_) return 1;
        return 0;
    }

private:
    long long pick_;
    long long budget_;
};
