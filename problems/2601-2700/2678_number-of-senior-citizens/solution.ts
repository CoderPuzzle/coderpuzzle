// The age is the two-digit field at offsets 11-12; char-code arithmetic
// decodes it without building a substring. The count is at most
// details.length <= 100, far below 2^53, so Number stays exact.
function countSeniors(details: string[]): number {
    let count = 0;
    for (const record of details) {
        const tens = record.charCodeAt(11) - 48;
        const ones = record.charCodeAt(12) - 48;
        if (tens * 10 + ones > 60) {
            count++;
        }
    }
    return count;
}
