# Main Configurations
BASEDIR=$(dirname "$0")
MAIN_DIR="$BASEDIR/../files"

CONFIG_DIR="$MAIN_DIR/config"
DB_CONFIG_FILE="$CONFIG_DIR/orthomcl.config"

FASTA_DIR="$MAIN_DIR/rawFasta"

echo "Starting OrthoMCL workflow"

# Adjustments
echo "Starting Adjustments"

COMPLIANT_FASTA_DIR="$MAIN_DIR/compliantFasta"
mkdir -p $COMPLIANT_FASTA_DIR
cd $COMPLIANT_FASTA_DIR

orthomclAdjustFasta sce "$FASTA_DIR/degaa-e-scer.fasta" 0
orthomclAdjustFasta mul "$FASTA_DIR/multi5protozoa.fasta" 1

# Filter fasta
echo "Filtering Proteins"

FILTERED_FASTA_DIR="$MAIN_DIR/filteredFasta"
mkdir -p $FILTERED_FASTA_DIR
cd $FILTERED_FASTA_DIR

orthomclFilterFasta $COMPLIANT_FASTA_DIR 10 20

# Creating the bast DB
echo "Creating blastp DB"

BLASTP_DIR="$MAIN_DIR/blastpData"
mkdir -p $BLASTP_DIR
cd $BLASTP_DIR

makeblastdb -in "$FILTERED_FASTA_DIR/goodProteins.fasta" -dbtype prot -out "$BLASTP_DIR/blastdb.blast"

# Running bastp
echo "Running blastp... Drink a coffee, go for a walk and wait, cuz it'll take long!"

#blastp -db "$BLASTP_DIR/blastdb.blast" -query "$FILTERED_FASTA_DIR/goodProteins.fasta" -out "$BLASTP_DIR/result.blast" -evalue 0.00001 -outfmt 6


# Parsing Blast
echo "Parsing blast to MCL Format"

ORTHOMCL_DIR="$MAIN_DIR/orthoMCL"
mkdir $ORTHOMCL_DIR
cd $ORTHOMCL_DIR

orthomclBlastParser "$BLASTP_DIR/result.blast" $COMPLIANT_FASTA_DIR >> similarSequences.txt

# Loading blast to MySQL
echo "Loading data into the database"

orthomclLoadBlast $DB_CONFIG_FILE similarSequences.txt

# Creating Pairs
echo "Creating Pairs"
orthomclPairs $DB_CONFIG_FILE pairs.log cleanup=yes

# Dumping Pairs
echo "Dumping Pairs"
orthomclDumpPairsFiles $DB_CONFIG_FILE

# Running MCL
echo "Running MCL"
mcl mclInput --abc -I 1.5 -o mclOutput

# MCL to Groups
echo "Grouping Results"
orthomclMclToGroups essential 1 < mclOutput > final_data.csv

# The end!!!
echo "Cleaning up tables"
orthomclPairs $DB_CONFIG_FILE pairs.log cleanup=all

echo "Process done!"