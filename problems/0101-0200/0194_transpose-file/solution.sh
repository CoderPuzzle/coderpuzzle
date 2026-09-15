# One pass: awk walks each row's fields into an (row, column) keyed
# array, and the END block walks the array column-major, so the output
# reads the input's columns as its rows. The input is read exactly once
# and nothing is rescanned.
awk '{
  for (i = 1; i <= NF; i++) cell[NR, i] = $i
  if (NF > width) width = NF
}
END {
  for (i = 1; i <= width; i++)
    for (j = 1; j <= NR; j++)
      printf "%s%s", cell[j, i], (j < NR ? " " : "\n")
}'
