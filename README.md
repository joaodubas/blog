# Blog pessoal

Blog para uso pessoal.

## Instalação

O sistema utiliza o `node.js` para servir os arquivos estáticos e persistir os
_posts_ no disco. Porém a instalação do `node.js` está além do escopo deste
guia, recomendamos que seja seguido os passos apresentados no guia da joyent.

Para verificar se o `node.js` foi instalado corretamente, no _terminal_ entre o
comando abaixo:

```bash
$ node --version
```

O resultado deve ser algo como:

```bash
v.0.10.x
```

Com o `node.js` instalado, é necessário instalar as dependências do projeto,
para tal execute o comando:

```bash
$ npm install
```

## Uso

Para iniciar o servidor de teste, rode o comando:

```bash
$ npm start
```

Isto permitirá a execução local do projeto, que estará acessível na url:
`http://127.0.0.1:16152`.

## Licença

```
Copyright (c) 2013 João Paulo Dubas <joao.dubas@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
