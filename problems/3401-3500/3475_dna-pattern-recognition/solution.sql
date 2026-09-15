SELECT
  sample_id,
  dna_sequence,
  species,
  dna_sequence GLOB 'ATG*' AS has_start,
  (
    dna_sequence GLOB '*TAA'
    OR dna_sequence GLOB '*TAG'
    OR dna_sequence GLOB '*TGA'
  ) AS has_stop,
  dna_sequence GLOB '*ATAT*' AS has_atat,
  dna_sequence GLOB '*GGG*' AS has_ggg
FROM
  samples
ORDER BY
  sample_id ASC