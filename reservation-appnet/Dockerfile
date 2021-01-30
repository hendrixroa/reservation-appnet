#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY reservation-appnet/reservation-appnet.csproj reservation-appnet/
RUN dotnet restore "reservation-appnet/reservation-appnet.csproj"
COPY . .
WORKDIR "/src/reservation-appnet"
RUN dotnet build "reservation-appnet.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "reservation-appnet.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "reservation-appnet.dll"]
