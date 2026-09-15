function countBinaryPalindromes(n: number): number {
    // Zero's representation "0" is a palindrome by definition.
    if (n === 0) {
        return 1;
    }
    let length = 0;
    for (let t = n; t > 0; t = Math.floor(t / 2)) {
        ++length;
    }
    // A binary palindrome is fixed by its first ceil(length / 2) bits (the
    // root): the rest mirrors them, sharing the middle bit when the length
    // is odd. Every root starts with a 1, so a length l carries exactly
    // 2^floor((l - 1) / 2) palindromes, all of them below n. Plain division
    // and multiplication stand in for shifts because JS bitwise operators
    // truncate to 32 bits, while every value here stays below 2^53.
    let count = 1; // zero itself
    for (let l = 1; l < length; ++l) {
        count += Math.pow(2, Math.floor((l - 1) / 2));
    }
    // Palindromes of n's own length ascend with their root, so every root
    // below n's root also lands entirely under n.
    const h = Math.floor((length + 1) / 2);
    const root: number = Math.floor(n / Math.pow(2, length - h));
    count += root - Math.pow(2, h - 1);
    // The only candidate left is the palindrome built from n's own root;
    // count it when it does not overshoot n.
    const half = Math.floor(length / 2);
    let rev = 0;
    let x = length % 2 === 1 ? Math.floor(root / 2) : root;
    for (let i = 0; i < half; ++i) {
        rev = rev * 2 + (x % 2);
        x = Math.floor(x / 2);
    }
    if (root * Math.pow(2, half) + rev <= n) {
        ++count;
    }
    return count;
}
