# Projeto de Armanzenamento de PDFs

## Estruturação do projeto

O início desse projeto foi começar a estruturar as tabelas que iria utilizar, então defini as seguintes tabelas e relacionamentos que achei necessário para o projeto:

### users:
| Campo           | Tipo         | Restrições                |
| --------------- | ------------ | ------------------------- | 
| `id`            | INT          | PK, AUTO_INCREMENT        | 
| `name`          | VARCHAR(100) | NOT NULL                  |
| `email`         | VARCHAR(150) | NOT NULL, UNIQUE          | 
| `password_hash` | VARCHAR(255) | NOT NULL                  | 
| `created_at`    | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | 

### pdf_files:
| Campo         | Tipo         | Restrições                 |
| ------------- | ------------ | -------------------------- | 
| `id`          | INT          | PK, AUTO_INCREMENT         | 
| `user_id`     | INT          | FK → `users(id)`, NOT NULL | 
| `pdf_name`    | VARCHAR(255) | NOT NULL                   | 
| `pdf_size`    | INT          | NOT NULL                   | 
| `uploaded_at` | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP  |

### tags:
| Campo     | Tipo        | Restrições                 |
| --------- | ----------- | -------------------------- | 
| `id`      | INT         | PK, AUTO_INCREMENT         |
| `user_id` | INT         | FK → `users(id)`, NOT NULL | 
| `name`    | VARCHAR(50) | NOT NULL                   |

### pdf_tags:
| Campo    | Tipo | Restrições                         |
| -------- | ---- | ---------------------------------- |
| `pdf_id` | INT  | PK, FK → `pdf_files(id)`, NOT NULL |
| `tag_id` | INT  | PK, FK → `tags(id)`, NOT NULL      |


Para guardar o campo senha foi necessária uma criptografia para proteger esse dado sensível, para isso eu optei por utilizar o Bcrypt utilizando a função `bcrypt.hash`, ao mesmo tempo que quando necessário para o login no sistema fiz o processo inverso, basicamente pegando a senha especificada pelo usuário, colocando-a na função novamente e comparando com a informação do banco. Esse processo de login também gerou um ponto crítico, que seria a sessão do usuário e garantir que o mesmo somente pudesse acessar os seus pdf's, como as suas respectivas tags (sendo essa questão das tags notada em meio a testes como mais de um usuário), para isso utilizei o padrão JSON Web Token (JWT) na qual utilizei `jwt.sign` para criar um token que é salvo em Local Store do navegador, esse token tem informações que posteriormente eu utilizo para garantir o acesso restrito aos pdf's desse usuário.

Durante a criação dos dados no Minio, optei por realizar o seguinte processo, eu crio um bucket para cada usuário cadastrado no sistema seguindo esse padrão: id-nomecompleto, o que facilitou posteriormente para o download do documento salvo no Minio.

## Execução do projeto

O projeto ele deve ser executado com o seguinte comando `docker compose up -d --build`, onde o -d é utilizado para livrar o terminal dos log's dos containers e --build é utilizado para ler o Dockerfile tanto da pasta Frontend quando da pasta Backend.

FrontEnd: http://localhost:5173
Backend: http://localhost:3000
Minio: http://localhost:9001
Mariadb: http://localhost:3306

## Aprendizado e próximos passos

Definitivamente esse projeto me ensinou muito a respeito do desenvolvimento fullstack, tenho mais facilidade para o ambiente de Backend então construir todo o front e tentar deixá-lo intuitivo ao mesmo tempo que visivelmente agradável foi um desafio, além de todos os erros que eu tive ao longo do projeto que me fizeram olhar com ainda mais cuidado para algumas questões, por exemplo se eu sempre estou importando as funções que criei. 

De próximos passos, principalmente esse tópico:

- Tratamento de erros amigável no FrontEnd;
- Ajustes no design;
- Criação de .env;
- Alteração na forma de execução do projeto (Produtizar)



