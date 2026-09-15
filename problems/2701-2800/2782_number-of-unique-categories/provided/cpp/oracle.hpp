// Problem-provided oracle (CategoryHandler), C++ side. Compiled into the
// judge's wrapper alongside every submission; never editable in the
// editor. Constructed from the case state: the category assignment as one
// generic OjValue plus the query budget; only haveSameCategory reveals it.
#pragma once

class CategoryHandler {
public:
    CategoryHandler(const OjValue& values, long long budget) : budget_(budget) {
        if (values.kind != OjValue::Array) throw std::runtime_error("CategoryHandler categories must be an array");
        category_.reserve(values.items.size());
        for (const OjValue& item : values.items) {
            if (item.kind != OjValue::Int) throw std::runtime_error("CategoryHandler categories must be integers");
            category_.push_back(static_cast<int>(item.integer));
        }
    }

    bool haveSameCategory(int a, int b) {
        spend();
        if (a < 0 || a >= static_cast<int>(category_.size()) || b < 0 ||
            b >= static_cast<int>(category_.size())) {
            return false;
        }
        return category_[a] == category_[b];
    }

private:
    void spend() {
        if (budget_ <= 0) throw std::runtime_error("CategoryHandler query budget exhausted");
        budget_ -= 1;
    }

    std::vector<int> category_;
    long long budget_;
};
