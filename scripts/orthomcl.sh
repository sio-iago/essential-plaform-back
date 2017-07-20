# Gets this script base dir
BASEDIR=$(dirname "$0")
FASTA_DIR="$BASEDIR/../files/rawFasta"

echo "Starting OrthoMCL workflow"

# Adjustments
echo "Starting Adjustments"

COMPLIANT_FASTA_DIR="$FASTA_DIR/../compliantFasta"
mkdir -p $COMPLIANT_FASTA_DIR
cd $COMPLIANT_FASTA_DIR

orthomclAdjustFasta sce "$FASTA_DIR/degaa-e-scer.fasta" 0
orthomclAdjustFasta mul "$FASTA_DIR/../rawFasta/multi5protozoa.fasta" 1

# Filter fasta
echo "Filtering Proteins"

FILTERED_FASTA_DIR="$FASTA_DIR/../filteredFasta"
mkdir -p $FILTERED_FASTA_DIR
cd $FILTERED_FASTA_DIR

orthomclFilterFasta $COMPLIANT_FASTA_DIR 10 20

# Creating the bast DB
echo "Creating bastp DB"

BLASTP_DIR="$FASTA_DIR/../blastpData"
mkdir -p $BLASTP_DIR
cd $BLASTP_DIR

makeblastdb -in "$FILTERED_FASTA_DIR/goodProteins.fasta" -dbtype prot -out "$BLASTP_DIR/blastdb.blast"

# Running bastp
echo "Running blastp... Drink a coffee, go for a walk and wait, cuz it'll take long!"

blastp -db "$BLASTP_DIR/blastdb.blast" -query "$FILTERED_FASTA_DIR/goodProteins.fasta" -out "$BLASTP_DIR/result.blast" -evalue 0.00001 -outfmt 6