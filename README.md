# Khipo

## Desenvolvido por Alan Botturi

### Start
Primeiro precisamos iniciar nosso servidor, para isso abra o terminal e navegue para dentro da pasta **./api**

 - ## Back-End
   - Instalar o docker desktop e iniciar
   - Checar se o docker-compose esta instalado ```docker-compose -v```
      > Se caso não estiver, instalar
   - Liberar a porta **5432** do computador
   - Dar o comando ```docker-compose up```
      > Espere aparecer no console **database system is ready to accept connections**
   - Depois de iniciado, dar o comando ```npm i```
   - Depois o comando ```npm run build``` para rodar as migrates do prisma
   - Depois podemos iniciar nosso servidor dando o camando ```npm run start```

Com o servidor iniciado podemos iniciar nossa aplicação, bastar entrar na pasta **./app**

 - ## Front-end
   - Iniciar o Back-end
      > é preciso somente para criar usuario e fazer login, mais o app conseguira rodar sem o back-end
   - Rodar o comando ```npm i```
   - Depois ```npm run start```