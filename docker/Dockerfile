FROM debian:trixie

WORKDIR /tmp

RUN apt-get update && \
    apt-get -y install wget unzip libgssapi-krb5-2 && \
    rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/orryverducci/TtxFromTS/releases/download/v2.0/linux-x64.zip && \
    unzip linux-x64.zip && \
    mv TtxFromTS /usr/local/bin && \
    chmod +x /usr/local/bin/TtxFromTS

RUN wget https://github.com/morski/TTI2IMG/releases/download/1.0.1/TTI2IMG -O /usr/local/bin/TTI2IMG && \
    chmod +x /usr/local/bin/TTI2IMG

COPY docker/grab-mpegts.sh /scripts/grab-mpegts.sh
COPY docker/create-ttx.sh /scripts/create-ttx.sh
