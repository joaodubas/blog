# nodejs database
#
# VERSION: see `TAG`
FROM joaodubas/nodejs:latest
MAINTAINER Joao Paulo Dubas "joao.dubas@gmail.com"

# Update system
RUN apt-get -y update \
    && apt-get -y install build-essential automake autoconf software-properties-common

# Add leveldb
RUN add-apt-repository 'deb http://archive.ubuntu.com/ubuntu saucy main' \
    && apt-get -y update \
    && apt-get -y install libleveldb-dev libleveldb1

# Add sshd
RUN mkdir -p /root/.ssh && chmod 700 /root/.ssh
ADD id_rsa.pub /root/.ssh/authorized_keys
RUN chmod 400 /root/.ssh/authorized_keys \
    && chown root:root /root/.ssh/authorized_keys

# Install node deps
RUN mkdir /opt/app
ADD package.json /opt/app/package.json
RUN cd /opt/app \
    && /usr/local/bin/npm install

# Configure path to database and port
ENV DBPATH /opt/app/db
ENV DBPORT 3000
WORKDIR /opt/app

# Expose database port
EXPOSE 3000

# Expect the database path to be /opt/app/db
VOLUME ["/opt/app/db", "/opt/app/log", "/opt/app/bin"]
