function numberToWords(num: number): string {
    const ones: string[] = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens: string[] = [
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
    ];
    const tens: string[] = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    // One group below 1000: the hundreds digit's word plus "Hundred", then
    // the remainder under 100 — taken wholesale through the teens, tens
    // word plus ones digit otherwise. "/" is fractional here, so every
    // digit extraction floors explicitly.
    function underThousand(value: number): string[] {
        const group: string[] = [];
        if (value >= 100) {
            group.push(ones[Math.floor(value / 100)], "Hundred");
            value %= 100;
        }
        if (value >= 20) {
            group.push(tens[Math.floor(value / 10)]);
            value %= 10;
        } else if (value >= 10) {
            group.push(teens[value - 10]);
            value = 0;
        }
        if (value > 0) {
            group.push(ones[value]);
        }
        return group;
    }

    // Walk the scales high to low: each non-empty group spells itself and
    // appends its scale word, so an all-zero middle group (1000010's
    // thousands) contributes nothing at all.
    const pieces: string[] = [];
    const scales: [number, string][] = [
        [1000000000, "Billion"],
        [1000000, "Million"],
        [1000, "Thousand"],
    ];
    for (const [scale, name] of scales) {
        if (num >= scale) {
            pieces.push(...underThousand(Math.floor(num / scale)), name);
            num %= scale;
        }
    }
    if (num > 0) {
        pieces.push(...underThousand(num));
    }
    // Zero is the only input that leaves no piece — it spells itself.
    return pieces.length > 0 ? pieces.join(" ") : "Zero";
}
