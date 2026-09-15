#pragma once

#include <vector>

class NestedInteger {
    bool held;
    long long integer;
    std::vector<NestedInteger> list;
public:
    NestedInteger() : held(false), integer(0) {}
    NestedInteger(long long value) : held(true), integer(value) {}
    bool isInteger() const { return held; }
    long long getInteger() const { return integer; }
    void setInteger(long long value) { held = true; integer = value; list.clear(); }
    void add(const NestedInteger& item) { held = false; list.push_back(item); }
    const std::vector<NestedInteger>& getList() const { return list; }
};
