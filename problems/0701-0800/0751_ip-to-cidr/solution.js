/**
 * @param {string} ip
 * @param {number} n
 * @return {string[]}
 */
var ipToCIDR = function (ip, n) {
    // The address is a plain number — exact below 2^53, so the 32-bit
    // value needs no wider type. Bitwise operators are avoided throughout
    // because they truncate their operands to 32 bits.
    let x = 0;
    for (const part of ip.split(".")) {
        x = x * 256 + Number(part);
    }
    const blocks = [];
    while (n > 0) {
        // Largest power-of-two block at x that the address divides into
        // evenly (its alignment) and that still fits the remaining count:
        // double from 1 while both hold. A block of 2^k addresses must
        // start at an address divisible by 2^k; address 0 divides evenly
        // by everything, so only the count caps it.
        let block = 1;
        let prefix = 32;
        while (block * 2 <= n && x % (block * 2) === 0) {
            block *= 2;
            prefix -= 1;
        }
        blocks.push(
            `${Math.floor(x / 16777216)}.${Math.floor(x / 65536) % 256}.${Math.floor(x / 256) % 256}.${x % 256}/${prefix}`,
        );
        x += block;
        n -= block;
    }
    return blocks;
};
