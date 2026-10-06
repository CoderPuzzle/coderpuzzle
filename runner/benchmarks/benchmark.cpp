#include <cstdint>
#include <iostream>

int main() {
    volatile std::uint32_t accumulator = 0x12345678U;
    for (std::uint32_t value = 0; value < 3'000'000U; ++value) {
        accumulator = (accumulator << 5) - accumulator + value;
    }
    std::cout << accumulator;
}
