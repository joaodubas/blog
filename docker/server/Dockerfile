# nodejs blog
#
# VERSION: see `TAG`
FROM joaodubas/nodejs-unstable:latest
MAINTAINER Joao Paulo Dubas "joao.dubas@gmail.com"

# Update system
RUN apt-get -y update \
    && apt-get -y install build-essential make

# Add sshd
RUN mkdir -p /root/.ssh && chmod 700 /root/.ssh
ADD id_rsa.pub /root/.ssh/authorized_keys
RUN chmod 400 /root/.ssh/authorized_keys \
    && chown root:root /root/.ssh/authorized_keys

# Expose server
EXPOSE 16152
