1. Introdução

1.1 Tecnologias e Plataformas Utilizadas

	1.	Frontend (React):
	•	Utilizaremos React para construir a interface principal.
	•	React-Phone-Input-2 será usado para máscara de telefone e seleção de código de país.
	•	Axios para fazer as requisições HTTP ao backend.
	•	Styled Components para gerenciar estilos no React, permitindo customização de CSS de forma modular.
	2.	Backend (Flask):
	•	O backend será desenvolvido usando Flask para gerenciar as rotas e lógica do jogo.
	•	SQLAlchemy será utilizado para gerenciar o banco de dados PostgreSQL de forma mais eficiente.
	•	Marshmallow para serialização e validação de dados.
	•	PyJWT para gerenciar tokens de autenticação.
	•	Gunicorn como WSGI para rodar o Flask em produção.
	•	Variáveis de ambiente serão usadas para segredos como chaves API, JWT secrets e conexão ao banco.
	3.	Banco de Dados (PostgreSQL):
	•	Será usado para armazenar dados do jogador, itens, biomas, cidades, logs, etc.
	•	Configurado para escalar facilmente conforme o número de jogadores aumenta.
	4.	Logs:
	•	JSON logs serão gerados para registrar eventos críticos do sistema, armazenados localmente ou no bucket Amazon S3.
	5.	Integração com ChatGPT (OpenAI):
	•	O sistema utilizará a API da OpenAI para permitir que o chat seja respondido com base em decisões e interações dos jogadores.
	6.	Integração com PayPal:
	•	Utilizado para processar pagamentos e compra de créditos.
	7.	Hospedagem:
	•	Frontend (React): Hospedado no Netlify ou Vercel. Ambos suportam CI/CD e são fáceis de integrar ao GitHub.
	•	Backend (Flask): Inicialmente será hospedado no Heroku devido à simplicidade e suporte ao PostgreSQL.
	•	Logs e Arquivos: JSON logs poderão ser armazenados localmente no servidor ou no Amazon S3.
	•	Banco de Dados: Utilizaremos o PostgreSQL oferecido pela Heroku, com possibilidade de migração futura para Amazon RDS (caso o Heroku não escale bem).

Diferença entre Plataformas de Hospedagem

	•	Heroku: Muito popular para projetos iniciais, com escalabilidade automática, suporte a diversos addons (PostgreSQL). Custo inicial baixo, mas pode ficar caro em projetos grandes.
	•	Amazon Web Services (AWS): Excelente para projetos escaláveis a longo prazo. Com a RDS para banco de dados e EC2 para servidores, permite maior controle, mas a configuração é mais complexa.
	•	Netlify/Vercel: Comumente usados para hospedar projetos frontend (React), oferecem integração contínua e são gratuitos até um certo limite.

2. Estrutura do Projeto

2.1 Estrutura de Pastas e Arquivos

rpg/
├── src/
│   ├── frontend/                 # Frontend em React
│   │   ├── components/           # Componentes React (chat, menus, etc.)
│   │   ├── modals/               # Modais (adicionar créditos, etc.)
│   │   ├── services/             # Chamadas API para o backend
│   │   ├── styles/               # Arquivos de estilo (Styled Components)
│   └── backend/                  # Backend Flask
│       ├── app.py                # Arquivo principal do Flask
│       ├── config.py             # Variáveis de configuração (PostgreSQL, JWT)
│       ├── routes/               # Rotas do backend (exploração, combate, etc.)
│       ├── models/               # Modelos para o banco de dados (SQLAlchemy)
│       ├── services/             # Lógica de negócios (combate, drop, etc.)
│       ├── logs/                 # Logs em formato JSON
├── .env                          # Variáveis de ambiente
├── README.md                     # Documentação
└── requirements.txt              # Dependências do backend

	•	Frontend: Dividido em components, modals (cada modal será um componente próprio) e services (chamadas para APIs do backend).
	•	Backend: Organizado com rotas, modelos (para o banco de dados), lógica de serviços e logs. O arquivo app.py será o ponto de entrada do Flask.

3. Desenvolvimento do Frontend

3.1 Interface Principal

	1.	Componentes
	•	O frontend será composto por dois menus laterais:
	•	Menu à esquerda: Itens, inventário, status do jogador (vida, cansaço, moedas, etc.).
	•	Menu à direita: Elementos dinâmicos, como status de combate, informações da loja, etc.
	•	Área Central: O chat, onde todas as decisões e interações acontecem.
	2.	Componentes para Status do Jogador
	•	Mostrará atributos como vida, cansaço, XP, itens equipados e moedas.
	•	Cada um desses componentes será um bloco separado, com interações via modais.

3.2 Login via Chat

	1.	Processo de Login
	•	O jogador será questionado pelo chat:
	•	“Como você gostaria de ser chamado?”
	•	“Qual é seu número de telefone?”
	•	Se for WhatsApp, o sistema usará a API (Z-API ou Twilio).
	•	Se for pela web, será solicitado: senha, confirmação de senha, e email para recuperação.
	2.	Z-API vs Twilio
	•	Z-API: Focado em integrar com o WhatsApp Business, permite gerenciar mensagens de forma mais direta, mas exige que o WhatsApp esteja funcionando em um telefone.
	•	Twilio: Mais robusto, suporta SMS, WhatsApp e outras integrações. Mais caro, mas com maior confiabilidade para projetos de escala.
	•	Sugestão: Z-API pode ser usado se o foco for WhatsApp, mas Twilio oferece maior escalabilidade e confiabilidade a longo prazo.

3.3 Adição de Créditos e Boas Práticas de Segurança

	1.	Modal de Adição de Créditos
	•	O jogador pode adicionar créditos via modal, integrado ao PayPal.
	•	Boas práticas:
	•	HTTPS para garantir que todas as transações sejam seguras.
	•	Tokenização de Cartão: Não armazenar dados sensíveis, apenas tokens fornecidos pela API do PayPal.
	•	Autenticação: O jogador deve estar autenticado (via JWT) para realizar qualquer transação.

4. Mapeamento de APIs

4.1 Rotas Principais

	•	/login: Gerencia o login e registro do jogador.
	•	/verificar-codigo: Valida o código de confirmação do WhatsApp.
	•	/explorar: Processa as escolhas de exploração (biomas, inimigos, construções).
	•	/combate: Calcula o resultado do combate.
	•	/itens/drop: Gera e entrega o drop de itens.
	•	/adicionar-creditos: Integração com PayPal para comprar créditos.

5. Desenvolvimento do Backend

5.1 Funções e Arquivos Backend

	1.	Funções Principais:
	•	login_jogador(): Gerencia login e verificação.
	•	explorar(): Roda o sorteio para definir o resultado da exploração (bioma, inimigos, construções).
	•	combate(): Realiza o cálculo do combate com base nos atributos.
	•	drop_item(): Gera o drop baseado nas chances calculadas e atributos.
	2.	Variáveis de Ambiente:
	•	Segredos como chaves de API e variáveis do banco de dados serão armazenadas no arquivo .env:

DATABASE_URL=postgresql://user:password@host:port/db
JWT_SECRET_KEY=seu_segredo_aqui
PAYPAL_CLIENT_ID=xxx
PAYPAL_CLIENT_SECRET=xxx



5.2 Plano para Variáveis de Ambiente

	1.	Uso das Variáveis:
	•	Conectar ao PostgreSQL com a DATABASE_URL.
	•	Autenticar e gerar tokens JWT usando o JWT_SECRET_KEY.
	•	Integração com PayPal via PAYPAL_CLIENT_ID e PAYPAL_CLIENT_SECRET.

6. Banco de Dados (PostgreSQL)

6.1 Estrutura do Banco

	1.	Tabelas do Banco de Dados:
	•	Jogadores: Armazena nome,### 6.1 Estrutura do Banco

1. **Tabelas do Banco de Dados**:
   - **Jogadores**: Nome, classe, atributos, XP, nível, tier, cansaço, etc.
   - **Itens**: Atributos do item (dano, esquiva, raridade), proprietário, status.
   - **Biomas**: Áreas exploradas, inimigos específicos, construções, eventos.
   - **Construções**: Cidades, fortalezas, dungeons, com recursos e desafios.
   - **Logs**: Registros de eventos críticos e combate.

2. **Variáveis Personalizáveis (Pesos e Chances)**:
   - **Exploração**: Chance de encontrar inimigos, biomas e construções.
   - **Itens Dropados**: Pesos de raridade (comum, raro, lendário) e ajuste de chances por bioma.
   - **Tag Iniciante**: Boosts temporários de velocidade, drops comuns/raros, e vantagens em combate.
   - **Cidades e Bancos**: Armazenamento de itens em cofres nas cidades, com limites por nível e raridade.

6.2 Práticas para Escalabilidade e Manutenção

   - Estruturar o banco com chaves estrangeiras (FK) para vincular jogadores e seus itens/biomas.
   - **Prática**: Utilizar variáveis para pesos e chances permite ajustes de balanceamento sem mudar o código.

7. Autenticação (JWT)

### 7.1 JWT e Autenticação
   - **Biblioteca PyJWT**: Geração e verificação de tokens JWT.
   - Tokens são gerados no login e enviados ao frontend para validação de futuras requisições.
   - **Rotas Protegidas**: Apenas usuários com JWT válido podem acessar dados sensíveis (itens, saldo de créditos).
   - **Segurança**: Implementar expiração de token e proteção contra ataques de replay.

8. Integração de Pagamentos (PayPal)

### 8.1 Modalidades de Pagamento
   - **Por Créditos**: O jogador compra créditos e os usa para adquirir itens, participar de eventos.
   - **Por Recorrência**: Assinaturas mensais garantem itens exclusivos, buffs, e recompensas recorrentes.
   - O **frontend** chama a API PayPal para processar o pagamento. Uma vez aprovado, os créditos são adicionados ao banco.
   - **Segurança**: Verificar transações via webhook e garantir que o token JWT está ativo durante o pagamento.

9. Testes e Refinamento

### 9.1 Testes de Integração e Unitários
   - **Frontend**:
     - Testar o fluxo de login, comunicação via chat, e as interações com o backend (login, combate, etc).
     - Verificar se as informações no menu dinâmico e lateral são atualizadas corretamente.
   - **Backend**:
     - Testar cada rota (login, exploração, combate).
     - Testar lógica de combate e cálculo de drop de itens.
     - Usar **pytest** para rodar testes unitários automáticos.
     - Implementar **testes de carga** para verificar como o backend se comporta com vários jogadores.

### 9.2 Testes durante o Desenvolvimento
   - Cada commit passará por testes automáticos no CI (Netlify ou Vercel para frontend, Heroku para backend).
   - Utilizar **Jest** para testar componentes do React e integração com o chat.

10. Documentação e Finalização do MVP

### 10.1 Documentação Durante o Projeto
   - **Prática recomendada**: Documentar cada parte do código ao longo do desenvolvimento.
   - Criar um README claro com instruções de instalação e uso do projeto.
   - **APIs**: Gerar documentação automática das rotas do backend (Swagger/OpenAPI).

Esses tópicos foram expandidos com muito mais detalhes e subtópicos para cobrir cada ponto que mencionou, incluindo hospedagem, tecnologias e testes contínuos durante o desenvolvimento.