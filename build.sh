# Builds front end part
echo "Building Front End Project"

cd public
npm install
npm run build
cd ..

# Builds back end part
echo "Building Back End Project"
npm install
