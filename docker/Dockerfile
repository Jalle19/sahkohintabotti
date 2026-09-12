FROM debian:trixie as ttxfromts-build

WORKDIR /tmp

RUN apt-get update && \
    apt-get -y install wget git-core && \
    wget https://packages.microsoft.com/config/debian/13/packages-microsoft-prod.deb -O packages-microsoft-prod.deb && \
    dpkg -i packages-microsoft-prod.deb && \
    rm packages-microsoft-prod.deb

RUN apt-get update && \
    apt-get -y install dotnet-sdk-10.0

COPY docker/dotnet-10.patch /tmp/dotnet-10.patch

RUN git clone --depth 1 https://github.com/orryverducci/TtxFromTS.git && \
    cd TtxFromTS && \
    git apply ../dotnet-10.patch && \
    dotnet publish --runtime linux-x64 --configuration Release

FROM debian:trixie AS run

WORKDIR /tmp

RUN apt-get update && \
    apt-get -y install wget unzip libgssapi-krb5-2 libicu76 && \
    rm -rf /var/lib/apt/lists/*

COPY --from=ttxfromts-build /tmp/TtxFromTS/TtxFromTS/bin/Release/net10.0/linux-x64/publish/TtxFromTS /usr/local/bin/TtxFromTS

RUN chmod +x /usr/local/bin/TtxFromTS

RUN wget https://github.com/morski/TTI2IMG/releases/download/1.0.1/TTI2IMG -O /usr/local/bin/TTI2IMG && \
    chmod +x /usr/local/bin/TTI2IMG

COPY docker/grab-mpegts.sh /scripts/grab-mpegts.sh
COPY docker/create-ttx.sh /scripts/create-ttx.sh
