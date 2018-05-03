# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network :forwarded_port, guest: 3306, host: 3306
  config.vm.network :forwarded_port, guest: 8080, host: 5000
  config.vm.provision :shell, :path => "install.sh"
  config.vm.synced_folder ".", "/home/vagrant/platform", :mount_options => ["dmode=777", "fmode=777"]
end