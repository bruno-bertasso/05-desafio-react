# Passo a Passo

## Prismic

[x] Gerado Modelo de Posts

[] Criar Posts de exemplo

[x] criado arquivo .env.local

1. PRISMIC_API_ENDPOINT

[x] adicionar dependências do prismic

1. @prismicio/client
2. prismic-dom
3. -D @types/prismic-dom

[x] criar serviço do prismic

## \_Document

[x] - Configurar a importação da fonte Inter do Google Fonts, com os tamanhos: Regular, Semi Bold e Bold.

1. Esse componente é o único do NextJS que é bom implementar como classe;
2. Use **Html**, **Head**, **Main** e **NextScripts** do 'next';
   1. Main é o equivalente do root do react
   2. NextScripts onde o next injeta seus scripts, abaixo do Mai
3. Google Fonts :
   1. use o **preconnect** do google fonts quanto antes, dentro do Head;
   2. lembre que ao importa do google fonts, fechar a tag.

# \_App

1. Importar os estilos globais
2. **TALVEZ** aqui importa o componente header.

# public

1. colocar a logo do figma;

## pages/Index.tsx

1. Nesse arquivo você deve renderizar todos os posts da paginação;
2. exibir o botão `Carregar mais posts` caso existam mais posts a ser carregados
   1. O valor `next_page` retornado pela Prismic não pode ser `null`). Caso contrário, o botão não deve ser renderizado.
3. A logo `spacetraveling`
   1. deve ser exportada do Figma e salva na pasta `public`.
   2. a logo deve ter o `alt` com o valor `logo`.
4. Ao clicar no post, é preciso navegar para a pagina do post seguindo o formato `/post/slugDoPost`
   1. onde `slugDoPost` é referente ao valor `slug` retornado pelo Prismic.
5. Por fim, a sua página deve ser gerada estaticamente.
   1. Isso significa que você deve utilizar o `getStaticProps` para buscar os dados do Prismic e popular a sua prop `postsPagination` exatamente como deixamos na estrutura de interfaces.
   2. Nesse método é obrigatório utilizar o [query](https://prismic.io/docs/technologies/query-a-single-type-document-javascript) do Prismic.

[x] - Exportar logo do figma e coloca-la na pasta public.

[x] - inserir logo, usando alt=logo

# components/Header/index.tsx

Nesse arquivo você deve renderizar a logo `spacetraveling`.

1. Ela deve ser exportada do Figma e salva na pasta `public`.
2. Além disso, a logo deve ter o `alt` com o valor `logo` para que o teste possa encontrá-la corretamente.
3. Por fim, ao clicar na logo é preciso navegar para a página principal `/`.
