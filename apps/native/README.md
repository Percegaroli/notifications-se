# Aplicativo de notificações

## Requisitos

### Expo Go

- [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)
- [iOs](https://itunes.apple.com/app/apple-store/id982107779)

### NodeJs

- [Baixar a ultima LTS](https://nodejs.org/en/)

## Executando (como desenvolvedor):

- Abrir a pasta native em um terminal e executar o comando:

```console
npm install
```

- Quando finalizar, executar o comando:

```console
npm start
```

- Abrir o aplicativo Expo Go no celular e scannear o QR Code que apareceu no terminal após o comando anterior. O terminal deve continuar aberto enquanto a aplicação estiver sendo executada

## Funcionamento

Ao inserir um email e apertar em conectar, o aplicativo ficará ouvindo em segundo plano por novas notificações que chegaram na api, e caso chegue exibirá uma notificação para o usuário
