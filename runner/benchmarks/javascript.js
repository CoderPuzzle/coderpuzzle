let accumulator = 0x12345678;
for (let value = 0; value < 3_000_000; value += 1) {
  accumulator = (((accumulator << 5) - accumulator + value) >>> 0);
}
process.stdout.write(String(accumulator));
