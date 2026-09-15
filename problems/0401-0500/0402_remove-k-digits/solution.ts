function removeKdigits(num: string, k: number): string {
    const stack: string[] = [];
    for (const ch of num) {
        // A kept digit larger than the arriving one should go: a smaller
        // digit in a more significant position outweighs anything later.
        while (k > 0 && stack.length > 0 && stack[stack.length - 1] > ch) {
            stack.pop();
            k--;
        }
        stack.push(ch);
    }
    // Unspent removals mean the digits were non-decreasing; drop from the
    // end, where the largest digits sit.
    if (k > 0) {
        stack.length = stack.length - k;
    }
    // Strip leading zeros; a fully consumed input yields "0", not "".
    const result = stack.join("").replace(/^0+/, "");
    return result === "" ? "0" : result;
}
