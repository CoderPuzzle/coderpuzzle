// Problem-provided oracle (BigArray), C++ side. Compiled into the
// judge's wrapper alongside every submission; never editable in the
// editor. Constructed from the case state: the maximal blocks of the
// hidden array as one generic OjValue (each block a [value, count]
// pair), then the query budget. Positions are 64-bit throughout.
#pragma once

class BigArray {
public:
    BigArray(const OjValue& blocks, long long budget) : budget_(budget) {
        if (blocks.kind != OjValue::Array) throw std::runtime_error("BigArray blocks must be an array");
        long long offset = 0;
        for (const OjValue& block : blocks.items) {
            if (block.kind != OjValue::Array || block.items.size() != 2) throw std::runtime_error("BigArray blocks must be [value, count] pairs");
            if (block.items[0].kind != OjValue::Int || block.items[1].kind != OjValue::Int) throw std::runtime_error("BigArray block entries must be integers");
            long long value = block.items[0].integer;
            long long count = block.items[1].integer;
            if (!values_.empty() && value == values_.back()) throw std::runtime_error("BigArray blocks must alternate values");
            values_.push_back(value);
            starts_.push_back(offset);
            offset += count;
        }
        total_ = offset;
    }

    int at(long long index) {
        if (budget_ <= 0) throw std::runtime_error("BigArray query budget exhausted");
        budget_ -= 1;
        int lo = 0;
        int hi = static_cast<int>(starts_.size()) - 1;
        int run = 0;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (starts_[mid] <= index) {
                run = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return static_cast<int>(values_[run]);
    }

    long long size() const {
        return total_;
    }

private:
    std::vector<long long> values_;
    std::vector<long long> starts_;
    long long total_;
    long long budget_;
};
