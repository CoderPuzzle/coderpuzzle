function betterCompression(compressed: string): string {
    const counts = new Array(26).fill(0);
    const n = compressed.length;
    let i = 0;
    while (i < n) {
        const letter = compressed.charCodeAt(i) - 97;
        i++;
        let freq = 0;
        while (i < n && compressed[i] >= "0" && compressed[i] <= "9") {
            freq = freq * 10 + (compressed.charCodeAt(i) - 48);
            i++;
        }
        counts[letter] += freq;
    }
    let result = "";
    for (let letter = 0; letter < 26; letter++) {
        if (counts[letter] > 0) {
            result += String.fromCharCode(97 + letter) + counts[letter];
        }
    }
    return result;
}
