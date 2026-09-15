// Parity fixes the last bit: one '1' must sit in the final position, so
// push every remaining '1' to the front and let all '0's slot in between
// them and that trailing one.
function maximumOddBinaryNumber(s: string): string {
    const ones = s.split("").filter((c) => c === "1").length;
    return "1".repeat(ones - 1) + "0".repeat(s.length - ones) + "1";
}
