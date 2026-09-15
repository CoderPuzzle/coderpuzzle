// Problem-provided oracle (Street), C++ side. Compiled into the
// judge's wrapper alongside every submission; never editable in the
// editor. Constructed from the case state: the door states as one
// generic OjValue plus the query budget; the agent starts at the first
// house.
#pragma once

class Street {
public:
    Street(const OjValue& values, long long budget) : budget_(budget) {
        if (values.kind != OjValue::Array) throw std::runtime_error("Street doors must be an array");
        doors_.reserve(values.items.size());
        for (const OjValue& item : values.items) {
            if (item.kind != OjValue::Int) throw std::runtime_error("Street doors must be integers");
            doors_.push_back(static_cast<int>(item.integer));
        }
    }

    void closeDoor() {
        spend();
        doors_[position_] = 0;
    }

    bool isDoorOpen() {
        spend();
        return doors_[position_] == 1;
    }

    void moveRight() {
        spend();
        position_ = (position_ + 1) % static_cast<int>(doors_.size());
    }

private:
    void spend() {
        if (budget_ <= 0) throw std::runtime_error("Street query budget exhausted");
        budget_ -= 1;
    }

    std::vector<int> doors_;
    long long budget_;
    int position_ = 0;
};
