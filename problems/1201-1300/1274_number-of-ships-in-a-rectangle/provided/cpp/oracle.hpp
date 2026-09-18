// Problem-provided oracle (Sea), C++ side. Compiled into the judge's
// wrapper alongside every submission; never editable in the editor.
// Constructed from the case state: the hidden ship points as one generic
// OjValue, then the query budget.
#pragma once

class Sea {
public:
    Sea(const OjValue& ships, long long budget) : budget_(budget) {
        if (ships.kind != OjValue::Array) throw std::runtime_error("Sea ship data must be an array");
        ships_.reserve(ships.items.size());
        for (const OjValue& point : ships.items) {
            if (point.kind != OjValue::Array || point.items.size() != 2
                || point.items[0].kind != OjValue::Int || point.items[1].kind != OjValue::Int) {
                throw std::runtime_error("Sea ship data must hold integer point pairs");
            }
            ships_.push_back({ static_cast<int>(point.items[0].integer), static_cast<int>(point.items[1].integer) });
        }
    }

    bool hasShips(const std::vector<int>& topRight, const std::vector<int>& bottomLeft) {
        if (budget_ <= 0) throw std::runtime_error("Sea query budget exhausted");
        budget_ -= 1;
        for (const auto& ship : ships_) {
            if (ship[0] >= bottomLeft[0] && ship[0] <= topRight[0]
                && ship[1] >= bottomLeft[1] && ship[1] <= topRight[1]) {
                return true;
            }
        }
        return false;
    }

private:
    std::vector<std::array<int, 2>> ships_;
    long long budget_;
};
