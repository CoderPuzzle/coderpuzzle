function countOddLetters(n: number): number {
    // Spell every digit as its lowercase word, concatenate in digit
    // order, and count letters: the answer is how many distinct
    // characters end up with an odd frequency.
    const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const counts = new Map<string, number>();
    for (const digit of String(n)) {
        for (const ch of words[Number(digit)]) {
            counts.set(ch, (counts.get(ch) ?? 0) + 1);
        }
    }
    let odd = 0;
    for (const count of counts.values()) {
        if (count % 2 === 1) odd++;
    }
    return odd;
}
