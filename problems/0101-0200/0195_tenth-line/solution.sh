# Stream the file once: NR is the line number of the line just read, so
# the tenth line prints and the program exits without reading past it.
awk 'NR==10 { print; exit }'
