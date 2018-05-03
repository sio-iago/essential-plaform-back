# Install some utilities and dependencies
apt-get update
apt-get upgrade 

apt-get install -y wget curl tar perl libmysqlclient-dev ncbi-blast+ mcl git

# Install MySQL
echo "mysql-server mysql-server/root_password password root" | debconf-set-selections
echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections
apt-get install -y mysql-server-5.5 mysql-client libdbd-mysql-perl

# Make a software folder
mkdir /software

# Install OrthoMCL
cd /software \
    && wget http://www.orthomcl.org/common/downloads/software/v2.0/orthomclSoftware-v2.0.9.tar.gz \
    && tar -xzvf orthomclSoftware-v2.0.9.tar.gz \
    && rm orthomclSoftware-v2.0.9.tar.gz

# Setup the OrthoMCL paths
echo "export PATH=$PATH:/software/blast-2.2.26/bin" >> ~/.bashrc
echo "export PATH=$PATH:/software/mcl/bin" >> ~/.bashrc
echo "export PATH=$PATH:/software/orthomclSoftware-v2.0.9/bin" >> ~/.bashrc

# Copy the orthomcl config file
cp /home/vagrant/platform/files/config/orthomcl.config /software/orthomcl.config

chown -R mysql:mysql /var/lib/mysql \
    && echo "Granting privileges to root" \
    && mysql -uroot -proot -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;" \
    && echo "Flushing privileges" \
    && mysql -uroot -proot -e "FLUSH PRIVILEGES;" \
    && mysql -uroot -proot -e "CREATE DATABASE orthomcl;" \
    && mysql -uroot -proot -e "CREATE DATABASE essential;"

echo "Restarting MySQL" \
    && service mysql restart

# NVM
# install latest nvm
git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
source ~/.nvm/nvm.sh
echo "source ~/.nvm/nvm.sh" >> ~/.bashrc

# install latest stable node.js
echo "Installing node.js... (please be patient)"
nvm install stable &> /dev/null
nvm alias default stable


# Copy everything needed to our vagrant user
echo "Copying all we need from root to run our services"

mv /root/.nvm /home/vagrant/.nvm
cp /root/.bashrc /home/vagrant/.bashrc
chmod 777 -R /home/vagrant/.nvm

# Change to our vagrant user
echo "Changing to vagrant user to start booting up Essential Platform"
sudo -u vagrant -i

# Source the bashrc
source /home/vagrant/.bashrc

# ===== Build the application ====== #

# echo "Building the platform"
# cd /home/vagrant/platform
# ./build.sh


# ======= Start the services ======= #

# echo "Starting the platform"
# npm start &
# npm run orthomcl &