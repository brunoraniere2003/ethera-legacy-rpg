Plano de ação Ethera Legacy

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

Estrutura do Projeto - Detalhamento e Sequência de Passos

Para organizar e executar o desenvolvimento do projeto de forma eficiente, vamos detalhar cada pasta e arquivo, explicando suas funções e a ordem de implementação. A estrutura do projeto será organizada para suportar o desenvolvimento modular e escalável.

2. Estrutura do Projeto

rpg/
├── src/
│   ├── frontend/                 
│   │   ├── components/           
│   │   ├── modals/               
│   │   ├── services/             
│   │   ├── styles/               
│   └── backend/                  
│       ├── app.py                
│       ├── config.py             
│       ├── routes/               
│       ├── models/               
│       ├── services/             
│       ├── logs/                 
├── .env                          
├── README.md                     
└── requirements.txt              

Explicação Detalhada e Sequência de Passos para Desenvolvimento

2.1 Estrutura do Frontend

	1.	frontend/ (Pasta raiz do frontend em React)
	•	Objetivo: Onde todo o código relacionado ao frontend será mantido. Este é o núcleo da interface visual do projeto.
	•	Passo 1: Criação da pasta frontend dentro de src/ e inicializar o projeto React.

npx create-react-app frontend
cd frontend


	2.	components/ (Componentes de interface do usuário)
	•	Objetivo: Armazenar todos os componentes visuais reutilizáveis, como menus, status do jogador, e o chat.
	•	Componentes principais:
	•	MenuEsquerdo.js: Contém a lógica de exibição do inventário, status do jogador e outros componentes estáticos do lado esquerdo.
	•	MenuDireito.js: Exibe dados dinâmicos (combate, informações da loja, etc.) que mudam com base nas ações do jogador.
	•	Chat.js: Implementa o chat principal, onde o jogador interage diretamente com o jogo.
	•	Passo 2: Criar a pasta components e começar com a implementação dos menus e chat.
	•	Primeiro, crie os componentes de menu.
	•	Em seguida, implemente o componente de chat.
	•	Integre a comunicação com o backend futuramente via Axios (inserido em services).
	3.	modals/ (Componentes de modal)
	•	Objetivo: Armazenar os modais usados para ações secundárias, como adicionar créditos ou acessar o marketplace.
	•	Modais principais:
	•	ModalAdicionarCreditos.js: Modal para adicionar créditos ao saldo do jogador, integrado ao PayPal.
	•	ModalMarketplace.js: Modal que permite o jogador acessar o marketplace e comprar/vender itens.
	•	Passo 3: Implementar o layout dos modais e integrar futuramente com o backend para processar pagamentos.
	4.	services/ (Chamadas de API)
	•	Objetivo: Contém a lógica para realizar chamadas à API do backend usando Axios. É a ponte de comunicação entre o frontend e o backend.
	•	Principais serviços:
	•	api.js: Arquivo que contém todas as chamadas de API (ex: login, explorar, combate).
	•	Exemplo: Função para login:

import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const login = async (phoneNumber, password) => {
  return axios.post(`${API_URL}/login`, { phoneNumber, password });
};


	•	Passo 4: Criar api.js com funções para login, explorar e interações com o PayPal.

	5.	styles/ (Estilos globais)
	•	Objetivo: Usar Styled Components ou CSS Modules para manter os estilos do projeto. Cada componente pode ter seus próprios estilos definidos separadamente.
	•	Passo 5: Implementar estilos básicos globais (ex: layout, cores, responsividade) e associar a cada componente.
	•	Estratégia:
	•	Criar um arquivo de temas globais para facilitar a mudança de aparência (ex: dark mode).
	•	Utilizar variáveis CSS para definir cores, espaçamento e fontes padrão.

2.2 Estrutura do Backend

	1.	backend/ (Pasta raiz do backend em Flask)
	•	Objetivo: Todo o código responsável pela lógica do servidor e interações com o banco de dados será mantido aqui.
	•	Passo 1: Inicializar o backend Flask.

mkdir backend
cd backend
python -m venv venv
source venv/bin/activate
pip install flask


	2.	app.py (Arquivo principal do Flask)
	•	Objetivo: Arquivo principal que configura o servidor Flask e define as rotas do backend.
	•	Passo 2: Criar app.py e configurar o servidor básico:

from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Bem-vindo ao Ethera Legacy!'

if __name__ == '__main__':
    app.run(debug=True)


	3.	config.py (Configurações e variáveis de ambiente)
	•	Objetivo: Armazenar configurações como as chaves API, credenciais do banco de dados e JWT secrets.
	•	Passo 3: Criar config.py para configurar as variáveis, garantindo que todas as credenciais sejam mantidas seguras e não hardcoded no código:

import os

class Config:
    SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    PAYPAL_CLIENT_ID = os.getenv('PAYPAL_CLIENT_ID')
    PAYPAL_CLIENT_SECRET = os.getenv('PAYPAL_CLIENT_SECRET')


	4.	routes/ (Rotas do backend)
	•	Objetivo: Armazenar todos os endpoints que serão consumidos pelo frontend. Exemplo de rotas para login, exploração e combate.
	•	Rotas principais:
	•	login.py: Rota para autenticação e geração de JWT.
	•	exploracao.py: Rota para ações de exploração do jogador (encontrar inimigos, construções).
	•	combate.py: Rota para o sistema de combate.
	•	Passo 4: Criar as rotas e começar com a de login para fazer autenticação via JWT.
	5.	models/ (Modelos de dados)
	•	Objetivo: Definir a estrutura de dados que será salva no banco de dados (PostgreSQL). Usaremos SQLAlchemy para facilitar o mapeamento objeto-relacional.
	•	Modelos principais:
	•	jogador.py: Contém os atributos do jogador (nome, classe, XP, etc.).
	•	item.py: Descreve os itens que podem ser equipados, encontrados ou vendidos.
	•	Exemplo de modelo:

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Jogador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    classe = db.Column(db.String(50))
    xp = db.Column(db.Integer, default=0)


	•	Passo 5: Implementar os modelos iniciais (Jogadores, Itens, Biomas).

	6.	services/ (Lógica de negócios)
	•	Objetivo: Definir funções específicas como o cálculo de combate, drops de itens e progressão do jogador.
	•	Serviços principais:
	•	combate_service.py: Lógica que calcula os resultados do combate baseado nos atributos do jogador e inimigo.
	•	drop_service.py: Função para gerar itens dropados após uma vitória.
	•	Passo 6: Implementar as funções de combate e exploração que serão chamadas pelas rotas.
	7.	logs/ (Logs do sistema)
	•	Objetivo: Registrar ações críticas e erros. Cada log será salvo em formato JSON para facilitar a auditoria e a depuração.
	•	Passo 7: Implementar logging para capturar eventos importantes como login, combate e transações de PayPal.

2.3 Arquivos de Configuração e Dependências

	1.	.env (Variáveis de ambiente)
	•	Objetivo: Armazenar variáveis de ambiente, como chaves de API, credenciais do banco e segredos JWT.
	•	Passo 1: Criar o arquivo .env e definir as variáveis necessárias:

DATABASE_URL=postgresql://user:password@localhost:5432/ethera_legacy
JWT_SECRET_KEY=uma_chave_secreta_aqui
PAYPAL_CLIENT_ID=seu_cliente_id
PAYPAL_CLIENT_SECRET=seu_segredo


	2.	README.md (Documentação)
	•	Objetivo: Manter uma documentação clara sobre como configurar e rodar o projeto.
	•	Passo 2: Criar o README.md com as instruções básicas de setup.
	3.	requirements.txt (Dependências do backend)
	•	Objetivo: Armazenar todas as bibliotecas necessárias para o backend.
	•	Passo 3: Criar o requirements.txt com as seguintes dependências:

flask
flask_sqlalchemy
pyjwt
marshmallow
gunicorn



Conclusão

Essa estrutura modular facilita a manutenção e escalabilidade do projeto. Ao seguir essa organização, cada parte será desenvolvida de maneira lógica e independente, permitindo o progresso contínuo do projeto sem sobrecarregar uma única área.

3.1 Passo 1

Estrutura dos Menus (Lateral e Responsividade)

	1.	Menus com Componentes:
Cada menu será um componente separado, com seu conteúdo específico. Um exemplo básico:

<div className="menu-esquerdo">
  {/* Componentes de inventário e status do jogador */}
  <Inventory />
  <StatusJogador />
</div>
<div className="menu-direito">
  {/* Componentes dinâmicos */}
  <AcoesDinamicas />
</div>

	2.	Responsividade:
Quando a largura da tela encolher, os menus laterais se transformarão em uma única seção com abas para cada menu e chat:

<div className="menu-secao">
  <ul className="abas">
    <li>Inventário</li>
    <li>Status</li>
    <li>Chat</li>
  </ul>
  <div className="conteudo-aba">
    {/* Exibir conteúdo da aba ativa (Inventário, Status ou Chat) */}
  </div>
</div>

	3.	Componentização dos Menus:
Será feito um componente para o menu esquerdo (Inventário, Status do jogador) e outro para o menu direito (ações dinâmicas).

Passo 3

Atributos e Interações

	1.	Exibição de Atributos (6 Atributos, XP, Cansaço):
Todos os atributos do jogador serão exibidos no menu esquerdo. Eles terão tooltip ao passar o mouse, usando algo como abbr para mostrar a descrição:

<div className="atributo">
  <abbr title="Pontos de Vida (Health Points)">
    Vida: {vida}
  </abbr>
</div>
<div className="atributo">
  <abbr title="Dano causado em combate">
    Dano: {dano}
  </abbr>
</div>
{/* Adicionar os outros 4 atributos, XP e cansaço */}

3.2 Passo 1

Elementos Frontend

	1.	Elementos da tela (sem verificações):
Apenas os elementos visuais serão colocados no frontend agora. Faremos as verificações mais tarde.

Passo 2

	1.	Escolha do Twilio:
Vamos usar Twilio para enviar os códigos de verificação e gerenciar o login via WhatsApp.

3.3 Passo 1

Modais de Ações

	1.	Modais para Ações:
	•	Adicionar Créditos: Integração com PayPal para adicionar créditos será feita via modal:

    <ModalAdicionarCreditos />

    •	Marketplace: O modal do marketplace também será integrado para compras de itens dentro do jogo:

    <ModalMarketplace />

3.3 Adição de Créditos e Boas Práticas de Segurança

1. Modal de Adição de Créditos

	•	O jogador poderá adicionar créditos diretamente pelo jogo, escolhendo entre valores específicos definidos por você.
	•	Adição de Créditos:
	•	O jogador clica em “Adicionar Créditos”, escolhe entre valores como R$10, R$25, R$50 ou mais, e a transação é processada via PayPal.
	•	Planos por Recorrência:
	•	O jogador pode optar por planos mensais como R$15/mês ou R$50/mês, que garantem benefícios exclusivos e itens especiais, que podem ser adquiridos com os créditos acumulados.
	•	Os créditos comprados por recorrência serão usados para adquirir itens no Marketplace ou outras vantagens no jogo, mas não são adicionados automaticamente.

2. Boas Práticas de Segurança para Transações

	•	HTTPS: Todas as transações serão feitas usando HTTPS para garantir que as comunicações sejam seguras e encriptadas.
	•	Tokenização de Cartão:
	•	Não armazenamos dados sensíveis, como números de cartão de crédito. Apenas tokens de pagamento fornecidos pela API do PayPal serão usados para processar transações.
	•	Autenticação via JWT:
	•	O jogador deve estar autenticado (via JWT) para realizar qualquer transação.
	•	Cada requisição será validada pelo token para garantir a segurança da operação.

3. Benefícios dos Planos de Recorrência

	•	Planos por recorrência podem oferecer:
	•	Itens exclusivos ou bônus especiais.
	•	Descontos no Marketplace ou em eventos do jogo.
	•	Vantagens temporárias, como buffs de combate ou maior chance de drop de itens raros.

Essa versão inclui a funcionalidade de benefícios e itens através de créditos comprados com planos recorrentes, garantindo que os jogadores obtenham vantagens e itens com os créditos comprados, sem adição automática.

4. Mapeamento de APIs

Esta seção detalha as rotas principais e adicionais que o backend do jogo Ethera Legacy usará para a comunicação entre o frontend e o backend. Essas rotas são fundamentais para gerenciar as interações do jogador, como exploração, combate, compras e ações no jogo.

4.1 Rotas Principais

	•	/login (POST): Gerencia o login e registro do jogador.
	•	Descrição: Recebe o número de telefone, nome de usuário e outros dados necessários. Envia um código de verificação para o WhatsApp, e gera um token JWT após a verificação.
	•	Parâmetros:
	•	telefone (string)
	•	nome_usuario (string)
	•	senha (opcional para web login)
	•	Resposta: Token JWT em caso de sucesso.
	•	/verificar-codigo (POST): Valida o código de confirmação do WhatsApp.
	•	Descrição: Recebe o código enviado ao jogador via WhatsApp, e verifica se o código corresponde ao que foi gerado para o número de telefone fornecido.
	•	Parâmetros:
	•	codigo_verificacao (string)
	•	telefone (string)
	•	Resposta: JWT se o código for validado com sucesso.
	•	/explorar (POST): Processa as escolhas de exploração (biomas, inimigos, construções).
	•	Descrição: Com base na escolha do jogador (explorar bioma, encontrar inimigos, ou explorar construções), essa rota gera um resultado de acordo com as probabilidades definidas para cada tipo de exploração.
	•	Parâmetros:
	•	tipo_exploracao (string): bioma, inimigos, ou construções.
	•	jogador_id (int)
	•	Resposta: Retorna o resultado da exploração, que pode ser um inimigo encontrado, uma nova construção descoberta, ou um bioma explorado.
	•	/combate (POST): Calcula o resultado do combate.
	•	Descrição: Recebe os dados do jogador e do inimigo (ou NPC) e calcula o resultado do combate, considerando atributos como dano, esquiva, chance de crítico, e cansaço.
	•	Parâmetros:
	•	jogador_id (int)
	•	inimigo_id (int)
	•	atributos_jogador (json): Dados dos atributos do jogador.
	•	Resposta: Retorna o resultado do combate (vitória/derrota), experiência adquirida e itens dropados, se houver.
	•	/itens/drop (POST): Gera e entrega o drop de itens.
	•	Descrição: Após o combate, essa rota é chamada para gerar o item que será dropado, com base nas chances de drop e raridade. Os itens podem variar de comuns a lendários.
	•	Parâmetros:
	•	jogador_id (int)
	•	resultado_combate (json): Informações do combate para determinar as chances de drop.
	•	Resposta: Detalhes do item dropado, incluindo raridade, atributos afetados e valores.
	•	/adicionar-creditos (POST): Integração com PayPal para comprar créditos.
	•	Descrição: Esta rota faz a interface com o PayPal, permitindo que os jogadores comprem créditos dentro do jogo.
	•	Parâmetros:
	•	jogador_id (int)
	•	valor_creditos (float)
	•	token_paypal (string): Token da transação gerada pelo PayPal.
	•	Resposta: Créditos adicionados à conta do jogador.

4.2 Rotas Adicionais

	•	/jogador/status (GET): Retorna o status atual do jogador.
	•	Descrição: Fornece informações atualizadas sobre os atributos do jogador, incluindo vida, cansaço, XP, e itens equipados.
	•	Parâmetros:
	•	jogador_id (int)
	•	Resposta: JSON contendo os atributos e status atual do jogador.
	•	/jogador/inventario (GET): Retorna o inventário completo do jogador.
	•	Descrição: Retorna a lista de todos os itens que o jogador possui, incluindo itens equipados e itens armazenados no inventário.
	•	Parâmetros:
	•	jogador_id (int)
	•	Resposta: JSON contendo o inventário completo.
	•	/loja/comprar-item (POST): Permite ao jogador comprar itens na loja.
	•	Descrição: O jogador pode usar créditos para comprar itens da loja do jogo, como armas, armaduras, e acessórios.
	•	Parâmetros:
	•	jogador_id (int)
	•	item_id (int)
	•	valor_creditos (float)
	•	Resposta: Confirmação da compra e o item é adicionado ao inventário do jogador.
	•	/loja/listar-itens (GET): Lista os itens disponíveis na loja.
	•	Descrição: Retorna uma lista de todos os itens disponíveis na loja, incluindo seus preços e atributos.
	•	Parâmetros:
	•	categoria (string, opcional): Pode filtrar por categoria de item (arma, armadura, etc.).
	•	Resposta: JSON contendo a lista de itens disponíveis.
	•	/missoes/listar (GET): Lista as missões disponíveis.
	•	Descrição: Fornece uma lista de missões que o jogador pode aceitar. As missões são filtradas por dificuldade e recompensas.
	•	Parâmetros:
	•	jogador_id (int)
	•	Resposta: Lista de missões disponíveis com detalhes como XP, recompensas e dificuldade.
	•	/missoes/aceitar (POST): Permite ao jogador aceitar uma missão.
	•	Descrição: O jogador pode aceitar uma missão que está disponível no momento.
	•	Parâmetros:
	•	jogador_id (int)
	•	missao_id (int)
	•	Resposta: Confirmação da aceitação da missão.
	•	/missoes/completar (POST): Marca a missão como concluída.
	•	Descrição: Após o jogador concluir a missão (explorar bioma, derrotar inimigos, etc.), essa rota registra a conclusão e entrega as recompensas.
	•	Parâmetros:
	•	jogador_id (int)
	•	missao_id (int)
	•	Resposta: Recompensas da missão, como XP e itens.
	•	/combate/historico (GET): Retorna o histórico de combates do jogador.
	•	Descrição: Fornece o histórico recente de batalhas do jogador, incluindo vitórias, derrotas e itens adquiridos.
	•	Parâmetros:
	•	jogador_id (int)
	•	Resposta: JSON contendo o histórico de combates.
	•	/jogador/desafios-diarios (GET): Retorna os desafios diários do jogador.
	•	Descrição: Lista os desafios diários que o jogador pode completar para ganhar recompensas adicionais.
	•	Parâmetros:
	•	jogador_id (int)
	•	Resposta: Lista de desafios diários com as recompensas e status de conclusão.
	•	/combate/detalhes-inimigo (GET): Retorna os detalhes de um inimigo específico.
	•	Descrição: Fornece informações detalhadas sobre um inimigo ou NPC que o jogador vai enfrentar, como vida, dano e habilidades.
	•	Parâmetros:
	•	inimigo_id (int)
	•	Resposta: JSON contendo atributos e informações sobre o inimigo.
	•	/jogador/cansaço (GET): Retorna o nível de cansaço do jogador.
	•	Descrição: Informa o nível atual de cansaço do jogador, que influencia diretamente o poder de combate.
	•	Parâmetros:
	•	jogador_id (int)
	•	Resposta: Nível de cansaço atual em porcentagem.
	•	/configuracoes/ajustar-pesos (POST): Ajusta os pesos de chances de drop ou outros eventos.
	•	Descrição: Permite a personalização dos pesos que influenciam os eventos no jogo, como as chances de drop de itens, de encontrar inimigos, etc.
	•	Parâmetros:
	•	tipo_evento (string): Tipo de evento (drop, combate, etc.)
	•	novo_peso (float)
	•	Resposta: Confirmação da alteração dos pesos.

4.3 Rotas de Autenticação e Sessão

	•	/autenticacao/renovar-token (POST): Renova o token JWT do jogador.
	•	Descrição: Se o token JWT do jogador estiver prestes a expirar, essa rota renova o token para que o jogador possa continuar jogando sem interrupções.
	•	Parâmetros:
	•	token_atual (string): O token JWT atual do jogador.
	•	Resposta: Um novo token JWT com validade estendida.
	•	/autenticacao/verificar-sessao (GET): Verifica se o jogador está logado.
	•	Descrição: Verifica se a sessão do jogador ainda está ativa com base no JWT.
	•	Parâmetros:
	•	jogador_id (int)
	•	Resposta: Status da sessão (ativa ou expirada).

Aqui está uma versão detalhada do plano para o Desenvolvimento do Backend, incluindo todas as funções, variáveis de ambiente e a lógica que vai integrar o ChatGPT para reconhecer a fala do jogador e transformá-la em ações predefinidas.

5. Desenvolvimento do Backend

O backend será responsável por gerenciar toda a lógica do jogo, interações dos jogadores, cálculos de combate, exploração, geração de itens e integração com serviços externos (como PayPal e ChatGPT).

5.1 Funções e Arquivos Backend

O backend será construído em Flask, com várias rotas para gerenciar as diferentes funcionalidades do jogo. Também utilizaremos SQLAlchemy para o banco de dados, PyJWT para autenticação, e uma integração com a API da OpenAI para interpretar a fala dos jogadores. Segue o detalhamento:

1. Funções Principais

Essas são as principais funções que compõem o core do backend e cobrem a maioria das interações de jogo.

	1.	login_jogador():
	•	Descrição: Responsável por autenticar o jogador. Ele recebe o nome do usuário, o número de telefone ou senha (dependendo do login via WhatsApp ou Web), gera um token JWT para a sessão e retorna esse token para o frontend.
	•	Processo:
	1.	O jogador envia os dados de login.
	2.	O backend verifica no banco de dados se o jogador existe.
	3.	Gera um token JWT e retorna ao jogador.
	4.	Se o jogador não existir, ele é registrado com os dados fornecidos.
	•	Variáveis de Ambiente:
	•	JWT_SECRET_KEY: Utilizado para assinar e verificar os tokens JWT.
	2.	verificar_codigo():
	•	Descrição: Essa função valida o código enviado para o jogador via WhatsApp (Twilio). O jogador fornece o código de verificação, e se estiver correto, a função retorna o token JWT para autenticar a sessão.
	•	Processo:
	1.	O jogador recebe um código via WhatsApp.
	2.	Ele insere o código no frontend, que é enviado ao backend.
	3.	O backend valida o código e, se estiver correto, autentica o jogador.
	3.	explorar():
	•	Descrição: Essa função gerencia a exploração do jogador, sorteando os resultados baseados nas probabilidades configuradas para biomas, inimigos e construções.
	•	Processo:
	1.	O jogador escolhe um tipo de exploração (bioma, inimigos ou construções).
	2.	A função roda um sorteio com base nos pesos de cada tipo de evento.
	3.	O backend retorna o resultado da exploração, que pode ser um inimigo encontrado, uma construção descoberta ou um novo bioma.
	4.	Integração com ChatGPT: A descrição dos eventos da exploração será gerada dinamicamente via OpenAI API, criando uma narrativa personalizada para cada exploração. Isso garante uma experiência única para cada jogador.
	4.	combate():
	•	Descrição: Essa função calcula o resultado de um combate entre o jogador e o inimigo com base nos atributos do jogador (vida, dano, esquiva, etc.) e no cansaço acumulado.
	•	Processo:
	1.	O backend recebe os atributos do jogador e do inimigo.
	2.	Calcula as chances de vitória com base na fórmula:
	•	Fórmula:
￼
	3.	Aplica o fator do cansaço para reduzir o poder do jogador.
	4.	Se o jogador vencer, chama a função drop_item() para gerar o loot. Se perder, aumenta o cansaço.
	5.	ChatGPT Integração: O ChatGPT pode fornecer descrições detalhadas do combate, criando uma experiência imersiva para o jogador, narrando os momentos chave da batalha.
	5.	drop_item():
	•	Descrição: Gera os itens que o jogador recebe após uma batalha. A função leva em consideração a raridade dos itens e o nível do jogador para gerar um loot adequado.
	•	Processo:
	1.	A função calcula as chances de cada raridade de item com base na fórmula:
	•	Fórmula para Raridade:
￼
	2.	O backend escolhe um item adequado ao nível do jogador.
	3.	O item é entregue ao jogador e adicionado ao inventário.
	4.	Integração com ChatGPT: A descrição do item dropado é gerada dinamicamente, dando mais personalidade ao item, como “A Espada Mítica de Ethera, forjada em antigas montanhas…”.
	6.	adicionar_creditos():
	•	Descrição: Permite que o jogador compre créditos usando a API do PayPal. Essa função é responsável por integrar o sistema de pagamento e adicionar os créditos na conta do jogador.
	•	Processo:
	1.	O jogador inicia a transação no frontend.
	2.	O backend comunica-se com o PayPal, utilizando os tokens de ambiente (PAYPAL_CLIENT_ID e PAYPAL_CLIENT_SECRET).
	3.	Após a confirmação da transação, os créditos são adicionados ao saldo do jogador.
	4.	Boas Práticas: O backend não armazena informações sensíveis de pagamento, apenas os tokens da transação fornecidos pelo PayPal.
	7.	gerenciar_missoes():
	•	Descrição: Gera as missões dinâmicas para o jogador, permitindo que ele aceite missões baseadas em seu nível e Tier.
	•	Processo:
	1.	A função consulta o banco de dados para verificar o nível e progresso do jogador.
	2.	Gera missões com base nesses parâmetros.
	3.	Retorna uma lista de missões, cada uma com seu nível de dificuldade, recompensas e tempo estimado.
	4.	Integração com ChatGPT: O ChatGPT gera descrições detalhadas e envolventes das missões, personalizando os diálogos e a narrativa da missão.
	8.	historico_combate():
	•	Descrição: Armazena o histórico de combate do jogador, permitindo que ele veja as batalhas anteriores e seus resultados.
	•	Processo:
	1.	Cada combate finalizado gera um log que é armazenado no banco de dados.
	2.	O jogador pode solicitar seu histórico de combate, que é retornado em formato JSON.
	9.	gerenciar_pets():
	•	Descrição: Controla a obtenção e evolução dos pets no jogo. Quando o jogador obtém um pet, ele é registrado, e seus atributos podem evoluir conforme o jogador avança.
	•	Processo:
	1.	O jogador pode encontrar um pet durante exploração ou combate.
	2.	O pet é registrado no inventário e evolui com o jogador.
	3.	Pets oferecem buffs no combate ou exploração (ex: mais chance de encontrar itens raros).
	4.	Integração com ChatGPT: A descrição do pet e seu comportamento é gerada de forma única, criando uma personalidade específica para cada pet.

2. Variáveis de Ambiente

As variáveis de ambiente serão armazenadas em um arquivo .env no backend. Elas incluem segredos e credenciais que não devem ser expostos publicamente.

	•	DATABASE_URL:
A URL de conexão com o banco de dados PostgreSQL.
	•	Exemplo:

DATABASE_URL=postgresql://usuario:senha@host:port/db


	•	JWT_SECRET_KEY:
Chave usada para assinar e verificar os tokens JWT.
	•	Exemplo:

JWT_SECRET_KEY=sua_chave_super_secreta


	•	PAYPAL_CLIENT_ID e PAYPAL_CLIENT_SECRET:
Usado para a integração com a API do PayPal, permitindo que os jogadores comprem créditos.
	•	Exemplo:

PAYPAL_CLIENT_ID=seu_client_id
PAYPAL_CLIENT_SECRET=seu_client_secret


	•	CHATGPT_API_KEY:
Chave para integração com a API do OpenAI, usada para gerar descrições, narrativas e interações personalizadas para o jogador.
	•	Exemplo:

CHATGPT_API_KEY=sua_api_key_aqui



3. Integração com ChatGPT para Comandos de Fala

Uma das funcionalidades diferenciadas do jogo será o reconhecimento de comandos de fala do jogador. Utilizando a API da OpenAI, o backend será capaz de interpretar comandos em texto ou voz e transformá-los em ações predefinidas.

	•	Processo:
	1.	O jogador insere um comando no chat ou envia via reconhecimento de voz.
	2.	O backend recebe o texto do comando e usa a API do ChatGPT para interpretar a intenção do jogador.
	3.	A API retorna uma ação predefinida baseada no comando. Exemplos de comandos:
	•	“Quero explorar um novo bioma”
	•	“Como está meu inventário?”
	•	“Atacar o inimigo com minha espada”
	4.	O backend mapeia o comando para a função correspondente (explorar, verificar inventário, combate, etc.).

4. Ordem de Desenvolvimento do Backend

O desenvolvimento do backend será feito em etapas, priorizando as funcionalidades críticas para o MVP.

	1.	Autenticação: Implementar o sistema de login e geração de tokens JWT.
	2.	Exploração: Desenvolver a lógica de exploração, sorteando biomas, inimigos e construções.
	3.	Combate: Implementar a função de combate, incluindo o cálculo de vitória e integração com o ChatGPT para narrativas.
	4.	Itens e Loot: Criar o sistema de loot, com geração de itens baseados na raridade e atributos.
	5.	Sistema de Créditos: Integrar o PayPal para compra de créditos.
	6.	Missões e Pets: Adicionar a funcionalidade de missões dinâmicas e pets evolutivos.
	7.	Histórico e Logs: Armazenar e permitir o acesso ao histórico de combate e logs do sistema.
	8.	Integração Completa com ChatGPT: Finalizar a integração do ChatGPT para todos os sistemas, como comandos de voz e narrativas detalhadas.

Este plano detalhado cobre as principais funções do backend e descreve a ordem de implementação, além de como as variáveis de ambiente serão gerenciadas e as integrações com o ChatGPT e PayPal serão feitas.

Aqui está um plano detalhado para o uso de variáveis de ambiente no projeto, explicando como cada uma será utilizada, implementada e mantida.

5.2 Plano para Variáveis de Ambiente

As variáveis de ambiente são essenciais para armazenar informações sensíveis como chaves de API, segredos de autenticação e credenciais de banco de dados. Vamos usar o arquivo .env para gerenciar essas variáveis, garantindo segurança e facilidade de manutenção.

1. Uso das Variáveis de Ambiente

1.1 Conexão ao Banco de Dados PostgreSQL

	•	Variável: DATABASE_URL
	•	Uso: A URL de conexão com o banco de dados PostgreSQL será armazenada nessa variável. Ela será usada pelo SQLAlchemy para conectar e interagir com o banco de dados.
	•	Formato:
	•	PostgreSQL requer uma URL no formato:

postgresql://usuario:senha@host:port/db


	•	Exemplo:

DATABASE_URL=postgresql://meu_usuario:minha_senha@localhost:5432/ethera_legacy


	•	Implementação no Flask: No arquivo config.py, a variável será usada para configurar o banco de dados:

import os
from flask_sqlalchemy import SQLAlchemy

# URL do banco de dados, vinda do arquivo .env
database_url = os.getenv('DATABASE_URL')
db = SQLAlchemy(app)
app.config['SQLALCHEMY_DATABASE_URI'] = database_url



1.2 Autenticação e Geração de Tokens JWT

	•	Variável: JWT_SECRET_KEY
	•	Uso: Esta chave será usada para assinar e verificar tokens JWT, garantindo a segurança na autenticação do usuário. Cada token JWT assinado contém informações do jogador e tem validade temporária.
	•	Formato:

JWT_SECRET_KEY=uma_chave_secreta_grande_e_segura


	•	Implementação no Flask: A chave será usada com a biblioteca PyJWT para gerar e verificar tokens JWT.

import jwt
import os

jwt_secret = os.getenv('JWT_SECRET_KEY')

# Gerar um token JWT
def gerar_token_jogador(jogador_id):
    token = jwt.encode({'jogador_id': jogador_id}, jwt_secret, algorithm='HS256')
    return token

# Verificar um token JWT
def verificar_token_jwt(token):
    try:
        dados = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        return dados['jogador_id']
    except jwt.ExpiredSignatureError:
        return None



1.3 Integração com PayPal

	•	Variáveis: PAYPAL_CLIENT_ID e PAYPAL_CLIENT_SECRET
	•	Uso: Essas variáveis contêm as credenciais da API do PayPal, permitindo que o sistema processe transações de pagamento para adicionar créditos ou planos recorrentes.
	•	Formato:
	•	O ID do cliente e o segredo do cliente são fornecidos pelo PayPal quando você configura sua aplicação.
	•	Exemplo:

PAYPAL_CLIENT_ID=client_id_gerado_pelo_paypal
PAYPAL_CLIENT_SECRET=client_secret_gerado_pelo_paypal


	•	Implementação no Flask:
	•	Essas variáveis serão usadas no backend para realizar chamadas à API do PayPal.

import os
import requests

paypal_client_id = os.getenv('PAYPAL_CLIENT_ID')
paypal_client_secret = os.getenv('PAYPAL_CLIENT_SECRET')

def gerar_token_paypal():
    url = "https://api.paypal.com/v1/oauth2/token"
    headers = {
        "Accept": "application/json",
        "Accept-Language": "en_US",
    }
    data = {
        "grant_type": "client_credentials"
    }
    response = requests.post(url, headers=headers, data=data, auth=(paypal_client_id, paypal_client_secret))
    return response.json()['access_token']



1.4 Integração com ChatGPT

	•	Variável: CHATGPT_API_KEY
	•	Uso: A chave da API da OpenAI será usada para gerar respostas personalizadas e criar narrativas dinâmicas no jogo com base nas interações do jogador.
	•	Formato:

CHATGPT_API_KEY=sua_openai_api_key


	•	Implementação no Flask:

import openai
import os

openai_api_key = os.getenv('CHATGPT_API_KEY')

# Função para chamar a API do ChatGPT
def gerar_resposta_chatgpt(pergunta):
    openai.api_key = openai_api_key
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=pergunta,
        max_tokens=150
    )
    return response.choices[0].text.strip()



2. Como Configurar e Usar o .env

	1.	Criação do arquivo .env:
No diretório raiz do projeto, crie um arquivo chamado .env. Adicione as variáveis sensíveis, como abaixo:

DATABASE_URL=postgresql://meu_usuario:minha_senha@localhost:5432/ethera_legacy
JWT_SECRET_KEY=uma_chave_secreta_grande_e_segura
PAYPAL_CLIENT_ID=client_id_gerado_pelo_paypal
PAYPAL_CLIENT_SECRET=client_secret_gerado_pelo_paypal
CHATGPT_API_KEY=sua_openai_api_key


	2.	Carregar variáveis de ambiente no Flask:
No arquivo app.py ou config.py, use a biblioteca python-dotenv para carregar as variáveis do .env:

from dotenv import load_dotenv
import os

# Carregar o arquivo .env
load_dotenv()

# Acessar as variáveis de ambiente
database_url = os.getenv('DATABASE_URL')
jwt_secret = os.getenv('JWT_SECRET_KEY')
paypal_client_id = os.getenv('PAYPAL_CLIENT_ID')
paypal_client_secret = os.getenv('PAYPAL_CLIENT_SECRET')
chatgpt_api_key = os.getenv('CHATGPT_API_KEY')


	3.	Segurança das Variáveis:
	•	O arquivo .env não deve ser incluído no controle de versão. Garanta que o arquivo .gitignore esteja configurado para ignorar o .env.
	•	Exemplo no .gitignore:

.env


	4.	Testes Locais:
	•	Para testar localmente, execute o Flask normalmente. Ele carregará automaticamente as variáveis do .env se você tiver configurado o python-dotenv.

3. Mantendo a Segurança

	1.	Nunca exponha variáveis sensíveis:
Ao configurar a aplicação em produção, nunca exponha diretamente essas variáveis em logs ou respostas de API.
	2.	Segurança em Produção:
	•	Ao hospedar o backend (como no Heroku ou AWS), certifique-se de adicionar essas variáveis diretamente no painel de configuração da plataforma.
	•	Por exemplo, no Heroku, você pode usar o painel de ambiente para adicionar essas variáveis em:

Config Vars -> Add Key and Value (DATABASE_URL, JWT_SECRET_KEY, etc.)

Este plano detalhado cobre todas as variáveis de ambiente necessárias para o projeto e descreve como configurá-las, usá-las e mantê-las seguras em desenvolvimento e produção.

Aqui está um plano detalhado para a estrutura do banco de dados, com cada tabela explicada, os relacionamentos entre elas e as variáveis personalizáveis que serão utilizadas no projeto.

6. Banco de Dados (PostgreSQL)

O banco de dados será responsável por armazenar todas as informações essenciais do jogo, como os dados dos jogadores, itens, biomas, construções e logs. Utilizaremos PostgreSQL por ser robusto e escalável, garantindo que o sistema suporte um grande número de jogadores.

6.1 Estrutura do Banco

1. Tabelas do Banco de Dados

Aqui estão as principais tabelas que estruturam o banco de dados do jogo:

	1.	Jogadores
	•	Armazena as informações essenciais de cada jogador.
	•	Campos:
	•	id: Chave primária única do jogador.
	•	nome: Nome escolhido pelo jogador.
	•	usuario: Nome de usuário único.
	•	telefone: Número de telefone para login via WhatsApp.
	•	email: Email de recuperação de conta.
	•	senha_hash: Hash da senha do jogador.
	•	classe: Classe escolhida (Mago, Guerreiro, Assassino, Arqueiro).
	•	atributos: JSON contendo os atributos do jogador (vida, dano, esquiva, etc.).
	•	xp: Pontos de experiência acumulados.
	•	nivel: Nível atual do jogador.
	•	tier: Tier do jogador, com base em seu poder de combate.
	•	cansaco: Percentual de cansaço atual.
	•	creditos: Quantidade de créditos disponíveis para gastar.
	•	data_criacao: Data de criação da conta.
	•	data_ultima_atividade: Última data de login ou ação no jogo.
SQL Exemplo:

CREATE TABLE jogadores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(255),
    senha_hash TEXT NOT NULL,
    classe VARCHAR(50),
    atributos JSONB,
    xp INT DEFAULT 0,
    nivel INT DEFAULT 1,
    tier INT DEFAULT 1,
    cansaco DECIMAL(5, 2) DEFAULT 0,
    creditos DECIMAL(10, 2) DEFAULT 0,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_ultima_atividade TIMESTAMP
);


	2.	Itens
	•	Armazena os itens coletados e equipados pelos jogadores.
	•	Campos:
	•	id: Chave primária do item.
	•	jogador_id: ID do jogador que possui o item (chave estrangeira).
	•	nome: Nome do item.
	•	tipo: Tipo do item (arma, veste, acessório).
	•	raridade: Raridade do item (comum, raro, lendário).
	•	atributos: JSON com atributos afetados (dano, esquiva, crítico).
	•	status: Equipado ou não equipado.
	•	data_drop: Data em que o item foi dropado.
SQL Exemplo:

CREATE TABLE itens (
    id SERIAL PRIMARY KEY,
    jogador_id INT REFERENCES jogadores(id),
    nome VARCHAR(255),
    tipo VARCHAR(50),
    raridade VARCHAR(50),
    atributos JSONB,
    status VARCHAR(50) DEFAULT 'na mochila',
    data_drop TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


	3.	Biomas
	•	Armazena as informações sobre os biomas explorados pelos jogadores.
	•	Campos:
	•	id: Chave primária do bioma.
	•	nome: Nome do bioma.
	•	descricao: Descrição do bioma e suas características.
	•	nivel_perigo: Nível de perigo do bioma (quanto maior, mais desafiador).
	•	chance_inimigos: Percentual de chance de encontrar inimigos.
	•	chance_construcoes: Percentual de chance de encontrar construções.
	•	chance_drop: Percentual de chance de dropar itens raros.
SQL Exemplo:

CREATE TABLE biomas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    descricao TEXT,
    nivel_perigo INT,
    chance_inimigos DECIMAL(5, 2),
    chance_construcoes DECIMAL(5, 2),
    chance_drop DECIMAL(5, 2)
);


	4.	Construções
	•	Armazena as informações sobre as construções (cidades, dungeons, castelos) exploradas pelos jogadores.
	•	Campos:
	•	id: Chave primária da construção.
	•	nome: Nome da construção.
	•	tipo: Tipo da construção (cidade, castelo, dungeon, fortaleza).
	•	bioma_id: Bioma onde a construção está localizada (chave estrangeira).
	•	descricao: Descrição da construção e seus desafios.
	•	eventos: JSON contendo os eventos possíveis dentro da construção (missões, chefes, etc.).
SQL Exemplo:

CREATE TABLE construcoes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    tipo VARCHAR(50),
    bioma_id INT REFERENCES biomas(id),
    descricao TEXT,
    eventos JSONB
);


	5.	Logs
	•	Armazena logs de eventos importantes no jogo, como combates, compras de itens, e interações.
	•	Campos:
	•	id: Chave primária do log.
	•	jogador_id: ID do jogador envolvido no evento (chave estrangeira).
	•	descricao: Descrição do evento (exemplo: “Jogador comprou 100 créditos”).
	•	data_log: Data e hora do evento.
SQL Exemplo:

CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    jogador_id INT REFERENCES jogadores(id),
    descricao TEXT,
    data_log TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



2. Variáveis Personalizáveis (Pesos e Chances)

Algumas variáveis do jogo precisam ser ajustáveis para fins de balanceamento. Elas serão armazenadas no banco de dados e poderão ser alteradas facilmente sem a necessidade de alterar o código diretamente.

	1.	Exploração:
	•	Define as chances de encontrar inimigos, construções ou novos biomas durante a exploração.
	•	Campos Personalizáveis:
	•	chance_inimigos: Percentual de chance de encontrar inimigos ao explorar.
	•	chance_construcoes: Percentual de chance de encontrar uma construção.
	•	chance_biomas: Percentual de chance de desbloquear um novo bioma.
SQL Exemplo:

INSERT INTO biomas (nome, descricao, nivel_perigo, chance_inimigos, chance_construcoes, chance_drop)
VALUES ('Floresta Sombria', 'Uma floresta perigosa com criaturas à espreita.', 5, 60, 30, 10);


	2.	Itens Dropados:
	•	Define os pesos de raridade para os itens que podem ser obtidos após combates e explorações.
	•	Campos Personalizáveis:
	•	pesos_raridade: JSON com os pesos para cada raridade (exemplo: comum 70%, raro 20%, lendário 10%).
SQL Exemplo:

INSERT INTO itens (jogador_id, nome, tipo, raridade, atributos, status)
VALUES (1, 'Espada Mística', 'arma', 'lendário', '{"dano": 20, "critico": 15}', 'equipado');


	3.	Tag Iniciante:
	•	Jogadores novos recebem um boost temporário, permitindo progressão mais rápida.
	•	Campos Personalizáveis:
	•	velocidade_movimento: Aumento de velocidade para explorar biomas.
	•	drop_iniciante: Aumenta a chance de dropar itens comuns ou raros nos primeiros níveis.
SQL Exemplo:

INSERT INTO jogadores (nome, usuario, classe, atributos, xp, nivel, cansaco, creditos)
VALUES ('Jogador1', 'jogador_iniciante', 'Guerreiro', '{"vida": 100, "dano": 50}', 1000, 5, 10, 50);


	4.	Cidades e Bancos:
	•	As cidades e fortalezas possuem bancos onde os jogadores podem armazenar seus itens.
	•	Campos Personalizáveis:
	•	capacidade_banco: Define quantos itens um jogador pode armazenar na cidade com base em seu nível.
	•	SQL Exemplo:

INSERT INTO construcoes (nome, tipo, descricao, bioma_id, eventos)
VALUES ('Fortaleza da Rocha', 'cidade', 'Uma fortaleza impenetrável nas montanhas.', 1, '{"evento": "banco"}');



3. Práticas para Escalabilidade e Manutenção

	1.	Estrutura com Chaves Estrangeiras (Foreign Keys):
	•	As tabelas itens, logs e construcoes possuem referências diretas à tabela jogadores para garantir a integridade dos dados e facilitar consultas entre tabelas.
	2.	Variáveis Personalizáveis:
	•	Utilizar JSON em campos como atributos dos itens, eventos nas construções, e variáveis de raridade. Isso permite que novos atributos e propriedades sejam adicionados ou modificados sem a necessidade de mudanças no esquema do banco de dados.

4. Planos de Manutenção e Backup

	•	Backups Regulares: Configurar backups automáticos do PostgreSQL, especialmente para as tabelas críticas como jogadores, itens, e logs.
	•	Indices e Otimizações: Adicionar índices nas colunas mais consultadas, como id_jogador em itens e logs, para melhorar a performance de busca e manutenção.
	•	Monitoramento: Utilizar ferramentas como o pgAdmin para monitorar a saúde e performance do banco de dados, verificando consultas lentas ou problemas de conexão.

Este plano detalha a estrutura de cada tabela e variável do banco de dados, além de garantir flexibilidade com variáveis personalizáveis e práticas de manutenção e escalabilidade.

Aqui está uma versão detalhada da seção 6.2 Práticas para Escalabilidade e Manutenção, com um foco mais profundo em como garantiremos que o banco de dados seja escalável, eficiente e de fácil manutenção ao longo do desenvolvimento do projeto.

6.2 Práticas para Escalabilidade e Manutenção

Para garantir que o banco de dados suporte um número crescente de jogadores e interações do jogo, adotaremos diversas práticas de escalabilidade e manutenção. Essas práticas vão desde a estruturação correta com chaves estrangeiras (FKs) até o uso eficiente de variáveis personalizáveis, visando otimizar o desempenho e a facilidade de ajustes no jogo sem a necessidade de refatoração de código.

1. Estruturar o Banco com Chaves Estrangeiras (FKs)

Uma das melhores práticas no design de bancos de dados relacionais é garantir que as tabelas sejam conectadas por meio de chaves estrangeiras (Foreign Keys - FKs). Isso garante a integridade referencial, ou seja, as relações entre tabelas estarão consistentes e atualizadas. No caso do nosso jogo, utilizaremos FKs para vincular tabelas como jogadores, itens, biomas, e construções.

Passos para Estruturar o Banco:

	1.	Relacionar Jogadores e Itens:
	•	Cada item no jogo pertence a um jogador. A tabela itens terá uma FK que se refere à tabela jogadores.
	•	Isso nos permitirá consultar todos os itens de um jogador específico e garantir que, ao deletar um jogador, seus itens sejam removidos automaticamente (se necessário) ou transferidos.
Exemplo SQL:

CREATE TABLE itens (
    id SERIAL PRIMARY KEY,
    jogador_id INT REFERENCES jogadores(id) ON DELETE CASCADE, -- Se o jogador for deletado, seus itens também serão
    nome VARCHAR(255),
    tipo VARCHAR(50),
    raridade VARCHAR(50),
    atributos JSONB,
    status VARCHAR(50) DEFAULT 'na mochila',
    data_drop TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


	2.	Relacionar Jogadores e Biomas:
	•	Biomas explorados e eventos relacionados também precisam ser armazenados e vinculados aos jogadores.
	•	Utilizaremos uma tabela intermediária que armazenará as explorações feitas por jogadores, permitindo que um mesmo bioma seja explorado por vários jogadores.
Exemplo SQL:

CREATE TABLE exploracoes (
    id SERIAL PRIMARY KEY,
    jogador_id INT REFERENCES jogadores(id),
    bioma_id INT REFERENCES biomas(id),
    data_exploracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


	3.	Relacionar Biomas e Construções:
	•	Cada construção estará localizada em um bioma. Isso ajuda a manter a organização do mundo do jogo e possibilita consultas eficientes para saber quais construções existem em um bioma específico.
Exemplo SQL:

CREATE TABLE construcoes (
    id SERIAL PRIMARY KEY,
    bioma_id INT REFERENCES biomas(id),
    nome VARCHAR(255),
    tipo VARCHAR(50),
    descricao TEXT,
    eventos JSONB
);



2. Variáveis Personalizáveis para Pesos e Chances

A capacidade de ajustar variáveis como pesos de drops, chances de encontrar inimigos, e boosts de iniciantes é fundamental para o balanceamento do jogo. Utilizar variáveis personalizáveis no banco de dados nos permitirá fazer ajustes sem necessidade de modificar diretamente o código-fonte, o que acelera a resposta a necessidades de balanceamento do jogo.

Passos para Implementar Variáveis Personalizáveis:

	1.	Pesos e Chances Personalizáveis em Exploração:
	•	As variáveis de chance de encontrar inimigos, construções, ou biomas durante a exploração serão armazenadas em uma tabela dedicada ou no próprio registro do bioma.
	•	Exemplo: Se quisermos alterar a chance de encontrar inimigos em um bioma específico, podemos ajustar os valores no banco diretamente.
Exemplo SQL:

UPDATE biomas
SET chance_inimigos = 40.5 -- Atualizando para 40.5% de chance de encontrar inimigos
WHERE id = 1;


	2.	Pesos para Drop de Itens:
	•	O sistema de drop de itens terá pesos específicos para cada raridade de item, como comum, raro, ou lendário. Esses pesos serão armazenados em uma tabela de configurações ou como um campo JSON nas tabelas relacionadas.
Exemplo de Implementação de Pesos:

CREATE TABLE config_drops (
    id SERIAL PRIMARY KEY,
    bioma_id INT REFERENCES biomas(id),
    peso_comum DECIMAL(5, 2),
    peso_raro DECIMAL(5, 2),
    peso_lendario DECIMAL(5, 2)
);

Exemplo de Atualização de Pesos:

UPDATE config_drops
SET peso_comum = 60.0, peso_raro = 30.0, peso_lendario = 10.0
WHERE bioma_id = 1;


	3.	Tag Iniciante e Boosts:
	•	A tag “iniciante” permite que novos jogadores tenham vantagens temporárias, como aumento na velocidade de exploração ou maior chance de obter itens raros. Esses valores também serão armazenados no banco e ajustáveis conforme necessário.
Exemplo SQL para Boosts de Iniciantes:

INSERT INTO boosts_iniciantes (jogador_id, boost_velocidade, boost_drops, duracao)
VALUES (1, 1.25, 1.5, '2024-12-31'); -- Boosts de 25% na velocidade e 50% mais chance de drops raros até 31 de Dezembro de 2024



3. Otimização e Manutenção

Para garantir que o banco de dados permaneça eficiente e escalável, adotaremos as seguintes práticas:

	1.	Criação de Índices:
	•	Índices serão adicionados nas colunas que serão frequentemente consultadas, como jogador_id em itens, biomas e logs. Isso aumentará a velocidade de recuperação de dados, especialmente à medida que o banco de dados crescer.
Exemplo de Criação de Índice:

CREATE INDEX idx_jogador_id ON itens(jogador_id);


	2.	Particionamento de Tabelas (Opcional para Crescimento Extremo):
	•	Se o banco de dados crescer consideravelmente, podemos aplicar técnicas de particionamento nas tabelas grandes como logs, dividindo-as por data ou por jogador, o que melhora o desempenho nas consultas.
Exemplo de Particionamento por Data:

CREATE TABLE logs_2024 PARTITION OF logs FOR VALUES FROM ('2024-01-01') TO ('2024-12-31');


	3.	Backup e Recuperação de Dados:
	•	Configuraremos backups automáticos diários, especialmente para tabelas críticas como jogadores, itens, e logs. Utilizaremos ferramentas de PostgreSQL e serviços da AWS, como Amazon S3, para armazenar esses backups em um ambiente seguro.
Comando para Backup Manual:

pg_dump -U usuario -h host -d nome_do_banco > backup.sql


	4.	Monitoramento do Desempenho:
	•	Ferramentas como o pgAdmin ou serviços de monitoramento da AWS (se hospedado na Amazon) serão usadas para rastrear a saúde do banco de dados, identificar consultas lentas, gargalos e problemas de conexão.
	•	Configuraremos alertas automáticos para notificações em caso de queda no desempenho ou uso excessivo de recursos.

4. Escalabilidade Horizontal e Migração para AWS

Se o jogo crescer significativamente, haverá a necessidade de escalar o banco de dados para suportar mais usuários e interações simultâneas. O PostgreSQL será escalado verticalmente aumentando a capacidade de memória e CPU, mas também poderemos optar por escalabilidade horizontal.

Passos para Escalabilidade e Migração para AWS:

	1.	Migração para AWS RDS:
	•	Inicialmente, nosso banco estará hospedado no Heroku, mas, conforme o jogo cresce, podemos migrar para AWS RDS para aproveitar melhor desempenho e flexibilidade.
	•	AWS RDS permitirá backups automáticos, maior controle sobre o ambiente de banco de dados, e escalabilidade conforme o número de jogadores aumentar.
	2.	Replicações e Clustering:
	•	Implementar replicações de leitura no RDS permitirá que as consultas pesadas sejam divididas entre vários nós de leitura, aliviando o nó principal de escrita.
	3.	Serviços de Cache (Redis ou Memcached):
	•	Utilizar Redis ou Memcached para armazenar temporariamente dados como informações de sessão ou cache de resultados de exploração pode melhorar drasticamente o desempenho do jogo.

Esse plano detalhado foca em práticas que garantem a escalabilidade, flexibilidade e manutenção contínua do banco de dados. Ele inclui o uso de chaves estrangeiras, variáveis personalizáveis, monitoramento, índices, particionamento e estratégias para crescer horizontalmente com a migração para AWS e utilização de serviços de cache.

Aqui está uma versão detalhada da seção 7. Autenticação (JWT), explicando o uso de tokens JWT para autenticação no projeto e os passos necessários para sua implementação:

7. Autenticação (JWT)

No Ethera Legacy, a autenticação será feita utilizando JWT (JSON Web Tokens). Esse método é seguro e amplamente utilizado em aplicações web modernas, permitindo autenticação sem estado (stateless), ou seja, não precisamos armazenar sessões no servidor. O PyJWT será a biblioteca principal no backend (Flask) para gerar e validar os tokens.

7.1 Configuração Inicial de JWT

Passos para Configuração de JWT:

	1.	Instalar a Biblioteca PyJWT:
	•	No backend, usaremos o PyJWT para geração e validação dos tokens JWT. Devemos adicionar essa biblioteca ao nosso projeto.
Instalação via pip:

pip install PyJWT


	2.	Configurar a Chave Secreta (JWT_SECRET_KEY):
	•	No arquivo de variáveis de ambiente (.env), será definida a chave secreta para assinar os tokens JWT. Essa chave será usada pelo servidor para garantir que os tokens gerados sejam válidos e não adulterados.
Exemplo de Configuração no .env:

JWT_SECRET_KEY=secreta_super_segura_aqui


	3.	Criação de Função para Geração de Tokens:
	•	Uma função será criada no backend para gerar um token JWT quando o jogador fizer login ou se registrar. Este token será retornado para o frontend, que o armazenará (normalmente no localStorage ou sessionStorage).
Exemplo de Função para Gerar o Token:

import jwt
from datetime import datetime, timedelta

def gerar_token_jogador(jogador_id):
    payload = {
        'id': jogador_id,
        'exp': datetime.utcnow() + timedelta(hours=24),  # Token expira em 24 horas
        'iat': datetime.utcnow()
    }
    token = jwt.encode(payload, 'secreta_super_segura_aqui', algorithm='HS256')
    return token

	•	Parâmetros Importantes:
	•	id: O identificador único do jogador, que será utilizado para buscar dados dele no backend.
	•	exp: Data de expiração do token (24 horas neste exemplo).
	•	iat: Data de emissão do token (gerado no momento do login).

	4.	Armazenamento Seguro do Token no Frontend:
	•	O frontend receberá o token JWT e o armazenará no localStorage ou sessionStorage, dependendo se o jogador optar por “manter-se logado”.
	•	Durante todas as requisições subsequentes, o frontend enviará esse token no cabeçalho de autorização (Authorization) para acessar rotas protegidas.
Exemplo de Armazenamento no Frontend (React):

localStorage.setItem('token', tokenRecebido);  // Token é salvo após login bem-sucedido



7.2 Proteção de Rotas e Validação de Tokens

Para garantir que apenas usuários autenticados possam acessar recursos protegidos, implementaremos validação de tokens JWT no backend para todas as rotas sensíveis.

Passos para Proteger Rotas com JWT:

	1.	Middleware para Verificação de Tokens:
	•	Um middleware será criado para interceptar todas as requisições que acessam rotas protegidas. Ele verificará se o token JWT está presente e se é válido.
Exemplo de Middleware de Autenticação:

from flask import request, jsonify
import jwt

def token_required(f):
    def decorated(*args, **kwargs):
        token = None
        # Token deve estar presente no cabeçalho Authorization
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]  # Bearer token

        if not token:
            return jsonify({'mensagem': 'Token ausente!'}), 401

        try:
            dados = jwt.decode(token, 'secreta_super_segura_aqui', algorithms=['HS256'])
            jogador_id = dados['id']
        except jwt.ExpiredSignatureError:
            return jsonify({'mensagem': 'Token expirado!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'mensagem': 'Token inválido!'}), 401

        return f(jogador_id, *args, **kwargs)  # Passa o jogador_id para a rota
    return decorated

	•	Fluxo de Validação:
	•	O middleware verifica se o token JWT está presente no cabeçalho da requisição.
	•	Caso o token esteja ausente ou seja inválido, a requisição é rejeitada.
	•	Se o token for válido, ele extrai o jogador_id e passa adiante para a rota protegida.

	2.	Proteção de Rotas Sensíveis:
	•	Aplicaremos o middleware nas rotas que devem ser protegidas, como as que envolvem transações financeiras (PayPal), combate, exploração, e gerenciamento de itens.
Exemplo de Uso em Rota Protegida:

@app.route('/combate', methods=['POST'])
@token_required
def combate(jogador_id):
    # Rota protegida, só pode ser acessada por um jogador com JWT válido
    # Lógica de combate aqui usando o jogador_id
    pass



7.3 Implementação de Expiração e Renovação de Tokens

	1.	Expiração do Token:
	•	Cada token terá uma validade de 24 horas (configurável). Após esse tempo, o token expira e o usuário precisa fazer login novamente.
Verificação de Expiração:
	•	Ao tentar usar um token expirado, o backend retornará um erro 401 informando que o token expirou. O frontend poderá, então, redirecionar o jogador para a tela de login ou solicitar um novo token.
Exemplo de Verificação de Expiração no Middleware:

try:
    dados = jwt.decode(token, 'secreta_super_segura_aqui', algorithms=['HS256'])
except jwt.ExpiredSignatureError:
    return jsonify({'mensagem': 'Token expirado!'}), 401


	2.	Renovação de Token:
	•	Podemos oferecer a funcionalidade de renovar o token antes que ele expire, sem que o jogador precise fazer login novamente. Isso pode ser feito automaticamente no frontend quando o token estiver perto de expirar.
Exemplo de Renovação de Token no Backend:

@app.route('/renovar-token', methods=['POST'])
@token_required
def renovar_token(jogador_id):
    novo_token = gerar_token_jogador(jogador_id)  # Gera um novo token com 24 horas
    return jsonify({'token': novo_token})

	•	O frontend pode verificar o tempo de expiração do token (com base no campo exp) e, se estiver próximo de expirar, realizar uma requisição para renovar o token automaticamente.

7.4 Proteção contra Ataques de Replay

Replay Attack é um tipo de ataque em que um token roubado pode ser reutilizado por um atacante. Para evitar esse tipo de ataque, implementaremos as seguintes práticas:

	1.	Limitar a Validade do Token:
	•	Reduzir o tempo de expiração do token para minimizar a janela de ataque (por exemplo, tokens expiram após 1 ou 2 horas). Como mencionado antes, o token pode ser renovado automaticamente.
	2.	Incluir um Campo iat (Issued At):
	•	O campo iat (issued at) no token garante que o token seja usado apenas dentro de um certo período após sua criação.
	3.	Controle de Sessão no Backend (Opcional):
	•	Embora JWT seja stateless, podemos opcionalmente armazenar uma “sessão ativa” no backend. Quando um token é usado, verificamos se ele corresponde a uma sessão ativa no banco de dados, bloqueando tentativas de reutilização de tokens revogados.

7.5 Testes de Autenticação e Segurança

Para garantir que a implementação de autenticação JWT funcione corretamente, realizaremos testes abrangentes, como:

	1.	Testes de Autenticação:
	•	Testar o fluxo completo de login, geração de token, e acesso a rotas protegidas.
	•	Verificar se, ao fornecer um token inválido ou expirado, a resposta do servidor é correta (erro 401).
	2.	Testes de Expiração e Renovação:
	•	Simular a expiração do token e garantir que o fluxo de renovação funcione conforme esperado.
	•	Testar o comportamento quando o token expira enquanto o jogador está em sessão.
	3.	Testes de Ataques de Replay:
	•	Testar se tokens roubados ou expirados podem ser reutilizados e garantir que isso seja bloqueado.

Resumo

A implementação de JWT para autenticação no Ethera Legacy trará segurança e simplicidade ao sistema de login. Com a geração e verificação de tokens, protegemos as rotas críticas do backend. Usaremos expiração de tokens para

8. Integração de Pagamentos (PayPal)

No projeto Ethera Legacy, a integração com o PayPal será utilizada para que os jogadores possam comprar créditos ou assinar planos de benefícios recorrentes, que oferecerão vantagens exclusivas no jogo, como itens especiais e buffs.

8.1 Modalidades de Pagamento

Vamos oferecer dois tipos principais de pagamentos no jogo:

	1.	Pagamento por Créditos:
	•	O jogador poderá comprar créditos que serão utilizados para adquirir itens, participar de eventos ou desbloquear conteúdo adicional.
	•	Cada transação irá gerar uma quantidade de créditos no banco de dados do jogador, que ele poderá usar conforme desejar.
	2.	Pagamento por Recorrência (Assinatura):
	•	Assinaturas mensais estarão disponíveis e garantirão itens exclusivos, buffs (vantagens no jogo) e recompensas recorrentes. A assinatura será renovada automaticamente via PayPal.
	•	Com isso, o jogador receberá uma quantidade específica de créditos e outros benefícios, mensalmente, enquanto a assinatura estiver ativa.

8.2 Implementação no Frontend

	1.	Criação do Modal de Adição de Créditos:
	•	No frontend (React), haverá um modal onde o jogador poderá adicionar créditos via PayPal. Este modal permitirá que o jogador escolha o valor dos créditos que deseja adquirir.
Exemplo de Modal de Adição de Créditos:

const ModalAdicionarCreditos = () => {
  return (
    <div className="modal">
      <h2>Adicionar Créditos</h2>
      <select name="creditos">
        <option value="100">100 Créditos - $5</option>
        <option value="500">500 Créditos - $20</option>
        <option value="1000">1000 Créditos - $35</option>
      </select>
      <button onClick={processarPagamento}>Pagar com PayPal</button>
    </div>
  );
};


	2.	Pagamento por Recorrência (Assinatura):
	•	Outro modal será implementado para gerenciar a assinatura mensal. Este modal mostrará os benefícios da assinatura e terá um botão para processar o pagamento recorrente via PayPal.
Exemplo de Modal de Assinatura:

const ModalAssinatura = () => {
  return (
    <div className="modal">
      <h2>Assinatura Mensal</h2>
      <p>Receba itens exclusivos e bônus no jogo mensalmente.</p>
      <button onClick={processarAssinatura}>Assinar com PayPal</button>
    </div>
  );
};


	3.	Funções para Processar o Pagamento:
	•	O botão “Pagar com PayPal” abrirá a página de pagamento do PayPal, onde o jogador poderá finalizar a transação. Para isso, usaremos a PayPal SDK para a integração do PayPal com nosso frontend.
Exemplo de Função para Processar o Pagamento:

const processarPagamento = () => {
  // Chamar a API PayPal para iniciar o pagamento
  window.paypal.Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: { value: '5.00' }  // Valor da compra
        }]
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (detalhes) {
        alert('Pagamento concluído com sucesso');
        // Enviar dados ao backend para registrar os créditos no jogador
      });
    }
  }).render('#paypal-button');
};



8.3 Integração no Backend

	1.	Criação de Rota para Adicionar Créditos:
	•	No backend (Flask), será criada uma rota para registrar o pagamento no sistema após a confirmação pelo PayPal. Esta rota receberá as informações do PayPal via webhook, verificando se a transação foi bem-sucedida e adicionando os créditos ao jogador.
Exemplo de Rota para Adicionar Créditos:

@app.route('/adicionar-creditos', methods=['POST'])
@token_required
def adicionar_creditos(jogador_id):
    dados_pagamento = request.get_json()
    
    # Verificar dados da transação com PayPal (exemplo simplificado)
    if verificar_transacao_paypal(dados_pagamento):
        # Adicionar créditos ao jogador no banco de dados
        jogador = Jogador.query.get(jogador_id)
        jogador.creditos += dados_pagamento['quantidade_creditos']
        db.session.commit()
        return jsonify({'mensagem': 'Créditos adicionados com sucesso!'}), 200
    else:
        return jsonify({'mensagem': 'Falha na verificação do pagamento.'}), 400


	2.	Criação de Rota para Assinatura Recorrente:
	•	Uma rota similar será criada para processar a assinatura mensal, verificando a renovação automática da assinatura e creditando os benefícios ao jogador.
Exemplo de Rota para Processar Assinatura:

@app.route('/assinatura', methods=['POST'])
@token_required
def assinatura(jogador_id):
    dados_pagamento = request.get_json()

    # Verificar transação recorrente com PayPal
    if verificar_assinatura_paypal(dados_pagamento):
        # Conceder benefícios de assinatura ao jogador
        jogador = Jogador.query.get(jogador_id)
        jogador.creditos += 1000  # Exemplo: 1000 créditos mensais
        jogador.beneficios_assinatura += 1  # Adiciona itens ou buffs
        db.session.commit()
        return jsonify({'mensagem': 'Assinatura processada com sucesso!'}), 200
    else:
        return jsonify({'mensagem': 'Erro ao processar assinatura.'}), 400



8.4 Webhook para Verificação de Pagamento

	1.	Verificação de Transações (Webhook):
	•	O PayPal oferece um sistema de webhook que nos notifica quando uma transação foi concluída. Integraremos esse webhook para garantir que as transações são válidas e realizadas com sucesso antes de adicionar os créditos ao jogador.
Exemplo de Implementação de Webhook no Backend:

@app.route('/paypal-webhook', methods=['POST'])
def paypal_webhook():
    dados_webhook = request.get_json()
    
    # Verificar a assinatura do webhook (PayPal envia um ID para validar)
    if verificar_webhook_paypal(dados_webhook):
        # Processar pagamento e atualizar saldo de créditos do jogador
        jogador_id = dados_webhook['jogador_id']
        jogador = Jogador.query.get(jogador_id)
        jogador.creditos += dados_webhook['quantidade_creditos']
        db.session.commit()
        return jsonify({'mensagem': 'Webhook processado com sucesso!'}), 200
    else:
        return jsonify({'mensagem': 'Falha na verificação do webhook.'}), 400



8.5 Segurança no Pagamento

	1.	HTTPS:
	•	Garantir que todas as transações e comunicação entre o frontend e backend sejam feitas via HTTPS para proteger as informações de pagamento dos jogadores.
	2.	Tokenização de Cartão:
	•	Não armazenamos diretamente os dados do cartão de crédito dos jogadores. Usamos a API do PayPal, que cuida da tokenização e dos dados sensíveis. Isso elimina o risco de expor informações bancárias.
	3.	Autenticação JWT:
	•	Para realizar pagamentos, o jogador deve estar autenticado no sistema, garantindo que o token JWT está ativo e válido durante toda a transação.
Exemplo de Cabeçalho de Autenticação no Frontend:

const token = localStorage.getItem('token');

fetch('/adicionar-creditos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    quantidade_creditos: 500
  })
});



8.6 Testes de Pagamento

	1.	Testes de Transação:
	•	Realizaremos testes para garantir que o fluxo de pagamento funcione corretamente, tanto para compras de créditos quanto para assinaturas.
	•	Testar o webhook do PayPal para garantir que todas as notificações de transações são processadas corretamente.
	2.	Testes de Segurança:
	•	Garantir que as transações são feitas via HTTPS e que os tokens JWT estão protegidos adequadamente.
	•	Testar falhas no pagamento e garantir que o sistema lida corretamente com pagamentos mal sucedidos.

Resumo

A integração com PayPal permitirá que os jogadores adquiram créditos e façam assinaturas mensais para obter benefícios dentro do jogo. A comunicação segura entre o frontend e o backend, juntamente com o uso de webhooks para verificar transações, garantirá que os pagamentos sejam processados de forma eficaz e segura.


9. Testes e Refinamento

No desenvolvimento do Ethera Legacy, garantir a qualidade do código e a integridade das funcionalidades será essencial. Vamos implementar uma estratégia de testes detalhada, cobrindo tanto o frontend quanto o backend. Abaixo, descreveremos os tipos de testes que faremos, as ferramentas que utilizaremos, e como eles serão implementados no projeto.

9.1 Testes de Integração e Unitários

Frontend

	1.	Testes de Login e Fluxo de Comunicação (Chat e Backend):
	•	Objetivo: Testar o fluxo de login do jogador, desde a entrada do número de telefone até a verificação via código (usando Twilio) e a criação de um perfil.
	•	Abordagem:
	•	Simular a interação do jogador com o sistema de login.
	•	Verificar se o token JWT é corretamente gerado e armazenado após o login.
	•	Garantir que o chat seja renderizado corretamente após o login, iniciando a comunicação com o backend.
	•	Ferramenta: Utilizaremos o Jest para testar os componentes React e a comunicação via Axios.
	•	Exemplo de Teste (Jest):

import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

test('Simular fluxo de login e exibir chat', () => {
  const { getByLabelText, getByText } = render(<Login />);
  fireEvent.change(getByLabelText(/Número de Telefone/i), { target: { value: '+5584999999999' } });
  fireEvent.click(getByText(/Enviar Código/i));
  // Verificar se o chat foi renderizado após o login
  expect(getByText(/Bem-vindo ao Chat/)).toBeInTheDocument();
});


	2.	Atualização dos Menus (Menus Laterais e Dinâmicos):
	•	Objetivo: Garantir que os menus esquerdo e direito são atualizados corretamente com base nas ações do jogador e nas mudanças de status (vida, XP, itens, etc.).
	•	Abordagem:
	•	Simular interações do jogador no chat e verificar se as informações de status (vida, cansaço, XP) mudam corretamente.
	•	Verificar se o menu dinâmico exibe corretamente os dados do combate ou da exploração.
	•	Ferramenta: React Testing Library para testar interações e verificações de UI.
	3.	Responsividade e Interface de Componentes:
	•	Objetivo: Garantir que a interface reaja corretamente à mudança de tamanho da tela (responsividade).
	•	Abordagem:
	•	Simular diferentes tamanhos de tela (celular, tablet, desktop).
	•	Verificar se os menus laterais são convertidos para uma única seção com abas, quando necessário.
	•	Ferramenta: Jest com @testing-library/react para simular o comportamento da interface.

Backend

	1.	Testes de Rotas (Login, Exploração, Combate):
	•	Objetivo: Testar se as rotas do backend funcionam corretamente, processando as requisições e retornando as respostas esperadas.
	•	Abordagem:
	•	Testar o login: Verificar se o token JWT é gerado corretamente ao passar as credenciais de login.
	•	Testar a rota de exploração: Simular uma exploração e verificar se o sistema retorna corretamente o bioma, inimigos ou construções encontrados.
	•	Testar o combate: Simular uma batalha e verificar se os resultados (vitória/derrota, drops) são processados corretamente.
	•	Ferramenta: Utilizaremos o pytest para realizar testes unitários e verificar o comportamento das rotas.
	•	Exemplo de Teste (pytest):

def test_login(client):
    response = client.post('/login', json={'telefone': '+5584999999999', 'codigo': '123456'})
    assert response.status_code == 200
    assert 'token' in response.json

def test_explorar(client):
    response = client.get('/explorar')
    assert response.status_code == 200
    assert 'bioma' in response.json


	2.	Lógica de Combate e Cálculo de Drop de Itens:
	•	Objetivo: Verificar se o cálculo de combate está correto, considerando os atributos do jogador e do inimigo, além de validar a geração de itens ao final do combate.
	•	Abordagem:
	•	Simular batalhas entre o jogador e diferentes inimigos, variando os atributos de ambos.
	•	Verificar se os itens dropados estão dentro das probabilidades de raridade definidas no sistema.
	•	Ferramenta: pytest com mocks para simular diferentes resultados de combate e drops.
	3.	Testes de Banco de Dados e Lógica de Negócios:
	•	Objetivo: Verificar se o sistema está salvando corretamente as informações no banco de dados (jogadores, itens, combate).
	•	Abordagem:
	•	Testar as transações de banco de dados ao salvar novos jogadores, itens e resultados de combate.
	•	Verificar a consistência dos dados após cada ação.
	•	Ferramenta: pytest com SQLAlchemy para testar as interações com o banco de dados.
	4.	Testes de Carga:
	•	Objetivo: Verificar como o backend se comporta com um grande número de jogadores simultâneos, testando sua escalabilidade e estabilidade.
	•	Abordagem:
	•	Simular múltiplas requisições simultâneas para rotas críticas (login, exploração, combate).
	•	Verificar se o sistema continua a responder dentro do tempo esperado e se não há falhas ou travamentos.
	•	Ferramenta: Locust ou JMeter para realizar testes de carga.

9.2 Testes durante o Desenvolvimento

Durante o desenvolvimento, os testes serão executados de forma contínua para garantir que o código permanece estável e funcional à medida que novas funcionalidades são adicionadas. Implementaremos CI/CD (Integração Contínua e Entrega Contínua) para garantir que cada novo commit seja testado automaticamente.

Testes Automáticos no CI/CD

	1.	Testes no Frontend:
	•	A cada novo commit no repositório, os testes de interface e responsividade do frontend serão executados automaticamente.
	•	Utilizaremos Netlify ou Vercel para integrar os testes ao fluxo de CI/CD.
	2.	Testes no Backend:
	•	O backend será testado em um ambiente isolado a cada commit. Todas as rotas, lógica de combate e interações com o banco de dados serão verificadas.
	•	Utilizaremos o Heroku CI para realizar esses testes automáticos, garantindo que o código do backend não quebre após novas implementações.
	3.	Utilização de Jest para Testes Unitários no Frontend:
	•	Jest será utilizado para testar os componentes React e a interação com o backend via Axios.
	•	Os testes verificarão se a interface e as interações do jogador estão funcionando corretamente.
	4.	Utilização de pytest no Backend:
	•	Todos os testes de rota, banco de dados e lógica de negócios serão feitos utilizando pytest.
	•	Garantiremos que a lógica de negócios (combate, exploração, geração de drops) funcione conforme esperado em todos os cenários.

9.3 Testes de Segurança

Além dos testes funcionais, será importante testar a segurança da aplicação:

	1.	Teste de Ataques CSRF e XSS:
	•	Garantir que o frontend está protegido contra Cross-Site Scripting (XSS) e Cross-Site Request Forgery (CSRF).
	•	Utilizaremos tokens CSRF nas requisições sensíveis (login, pagamento) para evitar esses ataques.
	2.	Teste de Vulnerabilidades de Autenticação:
	•	Verificar se o sistema de autenticação JWT está seguro, garantindo que os tokens não possam ser reutilizados ou interceptados.
	3.	Verificação de SSL e HTTPS:
	•	Garantir que todas as conexões entre o frontend, backend e o PayPal são feitas utilizando HTTPS, para proteger os dados dos jogadores.

9.4 Testes de Qualidade de Código e Linting

	1.	Ferramenta de Linting:
	•	Implementaremos o uso de ferramentas de linting (como ESLint para o frontend e Flake8 para o backend) para garantir a qualidade e a consistência do código.
	•	Essas ferramentas serão integradas ao pipeline de CI/CD, rodando automaticamente a cada novo commit.
	2.	Cobertura de Código:
	•	Será garantido que todas as funcionalidades do sistema estejam cobertas por testes. Utilizaremos ferramentas como Jest e pytest-cov para medir a cobertura de código.

Resumo

Nosso plano de testes garantirá que todas as funcionalidades do Ethera Legacy sejam verificadas continuamente, desde o fluxo de login até as interações mais complexas, como combates e compras dentro do jogo. Os testes serão realizados tanto no frontend quanto no backend, garantindo a segurança, escalabilidade e performance da aplicação.

9.5 Testes de Integração Contínua (CI) e Entrega Contínua (CD)

A Integração Contínua (CI) e a Entrega Contínua (CD) são fundamentais para garantir que o projeto se mantenha estável e funcional durante todo o processo de desenvolvimento. Cada novo código adicionado ao repositório passará por uma série de testes automáticos, garantindo que possíveis erros sejam identificados rapidamente.

Configuração de CI/CD para Frontend

	1.	Plataforma Utilizada:
	•	O frontend será hospedado no Netlify ou Vercel, que oferecem suporte a pipelines de CI/CD. Cada novo commit ou pull request no repositório Git disparará uma pipeline de testes automáticos.
	2.	Processo de Deploy:
	•	Quando um desenvolvedor realizar um push ou criar um pull request no GitHub, o Netlify ou Vercel criará automaticamente um novo ambiente de deploy para rodar testes.
	•	Se todos os testes forem aprovados, o frontend será atualizado automaticamente com a nova versão.
	3.	Testes no Pipeline de CI:
	•	Linting: Antes de qualquer coisa, o código passará por um processo de linting (com ESLint) para garantir que o código segue os padrões de estilo e não contenha erros de sintaxe.
	•	Testes de Interface: O Jest rodará testes de unidade para verificar a correta renderização dos componentes.
	•	Responsividade: Os testes verificarão se a interface se ajusta corretamente em diferentes tamanhos de tela (desktop, tablet, mobile).
	4.	Exemplo de Arquivo de Configuração CI no Netlify:

build:
  publish: ./build
  command: npm run build && npm run test

deploy:
  production:
    branch: main
    publish: ./build
  preview:
    branch: develop
    publish: ./build



Configuração de CI/CD para Backend

	1.	Plataforma Utilizada:
	•	O backend será hospedado no Heroku, utilizando sua integração nativa com GitHub para configurar o pipeline de CI/CD.
	2.	Testes no Pipeline de CI:
	•	Testes de Rotas: Ao fazer o push de novas mudanças no backend, o pytest será acionado automaticamente para rodar todos os testes de rota (como login, exploração, combate, etc.).
	•	Verificação de Integração com o Banco de Dados: Serão realizados testes para garantir que as mudanças feitas no código estão corretamente interagindo com o PostgreSQL.
	•	Cobertura de Código: Utilizaremos pytest-cov para garantir que todo o código está coberto por testes e que novas funcionalidades têm cobertura suficiente.
	3.	Processo de Deploy:
	•	Após o término dos testes, se todos os testes forem aprovados, o Heroku fará automaticamente o deploy da nova versão do backend.
	4.	Exemplo de Arquivo Procfile no Heroku:

web: gunicorn app:app


	5.	Exemplo de Configuração do Pipeline de CI no Heroku:

test:
  commands:
    - pytest --cov=app
deploy:
  production:
    branch: main
  staging:
    branch: develop



9.6 Testes de Comunicação Frontend e Backend

Durante o desenvolvimento, é essencial garantir que o frontend e o backend se comuniquem de maneira eficiente e segura. Isso inclui o envio de requisições HTTP e o tratamento correto das respostas, como autenticação JWT e o recebimento de dados dinâmicos do jogador.

	1.	Testes de Requisição e Resposta (Axios e Flask):
	•	Objetivo: Garantir que o frontend (React) está corretamente enviando requisições ao backend (Flask) e recebendo as respostas esperadas.
	•	Abordagem:
	•	Testar a funcionalidade de login, simulando a entrada de dados no frontend e verificando se o token JWT gerado é recebido corretamente.
	•	Verificar se a rota de exploração retorna os dados de biomas, construções ou inimigos.
	•	Simular batalhas no frontend e verificar se o backend retorna os resultados corretamente.
	•	Ferramenta: Jest (frontend) e pytest (backend) para testar a integração entre ambas as partes.
	2.	Testes de Validação JWT:
	•	Objetivo: Testar se o backend está validando corretamente o token JWT enviado pelo frontend nas rotas protegidas.
	•	Abordagem:
	•	Enviar requisições com tokens JWT válidos e inválidos, verificando se o backend retorna o status HTTP correto.
	•	Ferramenta: pytest com mocks para simular requisições autenticadas e não autenticadas.

9.7 Testes de Funcionalidades Específicas (Exploração, Combate, Drops)

Cada uma das funcionalidades do jogo possui sua própria lógica e regras específicas. É crucial garantir que cada parte do sistema funcione corretamente e que a experiência do jogador seja consistente.

Testes de Exploração

	1.	Objetivo: Garantir que a exploração funciona conforme esperado, incluindo a chance de encontrar biomas, inimigos e construções.
	2.	Abordagem:
	•	Simular múltiplas explorações e verificar se os resultados estão dentro das probabilidades estabelecidas.
	•	Verificar se os dados retornados (nome do bioma, inimigos encontrados) estão corretos.
	3.	Ferramenta: pytest para testes de backend e verificação de lógicas de sorteio.

Testes de Combate

	1.	Objetivo: Testar se o sistema de combate calcula corretamente as chances de vitória e derrota, considerando os atributos do jogador e do inimigo.
	2.	Abordagem:
	•	Simular batalhas com diferentes combinações de atributos entre o jogador e o inimigo.
	•	Verificar se o cálculo de dano, esquiva, e chance de crítico estão corretos.
	•	Verificar se o cansaço e os atributos do jogador são atualizados corretamente após a batalha.
	3.	Ferramenta: pytest com mocks para simular diferentes cenários de combate.

Testes de Drop de Itens

	1.	Objetivo: Testar se os itens dropados após o combate seguem as regras de raridade e atribuição de atributos.
	2.	Abordagem:
	•	Simular batalhas e verificar se os itens dropados correspondem às chances estabelecidas para cada raridade (comum, raro, épico, etc.).
	•	Verificar se os atributos dos itens estão sendo gerados corretamente.
	3.	Ferramenta: pytest para verificar a lógica de drops e atribuição de atributos.

9.8 Testes de API e Webhooks (PayPal)

Os testes de integração com o PayPal são essenciais para garantir que os pagamentos sejam processados corretamente e que as ações subsequentes (créditos ou recorrências) sejam aplicadas ao jogador.

	1.	Testes de Webhooks:
	•	Objetivo: Verificar se o webhook do PayPal está corretamente configurado para receber notificações de pagamento e processar as ações associadas.
	•	Abordagem:
	•	Simular uma compra de créditos e verificar se o webhook do backend recebe a confirmação de pagamento.
	•	Verificar se, após a confirmação, os créditos são corretamente adicionados ao saldo do jogador no banco de dados.
	•	Ferramenta: Postman para enviar requisições de webhook simuladas ao backend.
	2.	Testes de API PayPal (Créditos e Recorrências):
	•	Objetivo: Garantir que a API do PayPal está corretamente processando as transações e atualizando os dados no banco de dados.
	•	Abordagem:
	•	Simular uma compra de créditos e verificar se a transação é registrada corretamente no backend.
	•	Simular uma assinatura recorrente e verificar se os benefícios (itens, buffs) são atribuídos ao jogador conforme esperado.
	•	Ferramenta: Postman e pytest para simular as transações e validar as respostas do PayPal.

Resumo dos Próximos Passos:

Com a implementação desses testes detalhados, vamos garantir que Ethera Legacy seja lançado com a mais alta qualidade. Desde a integração frontend-backend até a lógica de gameplay, tudo será rigorosamente testado para garantir uma experiência estável, segura e envolvente para os jogadores.

10. Documentação e Finalização do MVP

10.1 Documentação Durante o Projeto

A documentação é essencial para garantir que o código seja compreensível, fácil de manter, e escalável por outros desenvolvedores no futuro. Vamos documentar o projeto ao longo de todo o processo de desenvolvimento, em vez de deixar a documentação para o final. Abaixo estão os detalhes das práticas e ferramentas que serão utilizadas.

10.1.1 Documentação do Código

	1.	Objetivo:
	•	Documentar cada função, classe e módulo para facilitar o entendimento do código por qualquer desenvolvedor que venha a trabalhar no projeto, incluindo você mesmo no futuro.
	2.	Abordagem:
	•	Em cada função desenvolvida no backend e frontend, será incluído um comentário detalhado que explique:
	•	O que a função faz.
	•	Quais são os parâmetros de entrada.
	•	O que ela retorna.
	•	Quais erros podem ocorrer (caso existam).
	3.	Ferramenta:
	•	Utilizaremos docstrings no Python para documentar o backend com o seguinte formato:

def login_jogador(phone_number: str, password: str) -> bool:
    """
    Função responsável por autenticar um jogador no sistema.
    :param phone_number: O número de telefone do jogador.
    :param password: A senha do jogador.
    :return: Retorna True se a autenticação for bem-sucedida, caso contrário False.
    :raises ValueError: Se os dados forem inválidos ou incorretos.
    """
    pass


	•	No frontend, vamos usar comentários JavaScript para descrever cada parte dos componentes React:

/**
 * Componente de exibição de status do jogador.
 * Mostra os atributos atuais, como vida, cansaço e XP.
 * @param {object} props - Os dados do jogador.
 * @returns {JSX.Element} Elemento JSX que renderiza os atributos.
 */
const StatusJogador = (props) => {
    return (
        <div>
            <p>Vida: {props.vida}</p>
            <p>Cansaço: {props.cansaco}</p>
            <p>XP: {props.xp}</p>
        </div>
    );
}


	4.	Passos:
	•	Passo 1: Cada vez que criarmos ou modificarmos uma função no backend, adicionaremos uma docstring para explicar seu funcionamento.
	•	Passo 2: Cada componente React no frontend terá comentários explicando seu propósito e as interações principais com os dados.
	•	Passo 3: Atualizar a documentação sempre que houver mudanças nas funcionalidades.

10.1.2 Criação do README.md

	1.	Objetivo:
	•	Criar um arquivo README.md completo que servirá como guia de uso para qualquer pessoa que queira instalar, configurar ou contribuir com o projeto.
	2.	Estrutura do README.md:
	•	Título do Projeto: Ethera Legacy - RPG baseado em exploração e combate.
	•	Descrição: Breve descrição do que é o jogo, seus objetivos e como funciona.
	•	Instalação:
	•	Passo a passo para clonar o repositório, instalar as dependências e rodar o projeto localmente.
	•	Incluir os comandos para o frontend:

git clone https://github.com/seu-usuario/ethera-legacy
cd frontend
npm install
npm start


	•	Incluir os comandos para o backend:

cd backend
pip install -r requirements.txt
flask run


	•	Uso:
	•	Explicar como rodar o projeto, entrar na interface e fazer o login.
	•	Como usar as funcionalidades básicas (exploração, combate, etc.).
	•	Configurações de Ambiente:
	•	Detalhar as variáveis de ambiente necessárias (chaves de API, JWT secret, banco de dados).
	•	Exemplo:

DATABASE_URL=postgresql://user:password@localhost:5432/ethera_legacy
JWT_SECRET_KEY=uma_chave_secreta_aqui
PAYPAL_CLIENT_ID=seu_cliente_id_aqui
PAYPAL_CLIENT_SECRET=seu_segredo_aqui


	•	Contribuição:
	•	Instruções sobre como contribuir para o projeto (fazer fork, pull requests, etc.).
	•	Diretrizes para adicionar novas funcionalidades ou corrigir bugs.
	•	Licença: Especificar a licença usada (MIT, GPL, etc.).

10.1.3 Documentação Automática das Rotas (API)

	1.	Objetivo:
	•	Gerar automaticamente a documentação das rotas de API do backend para que os desenvolvedores possam facilmente entender como interagir com o backend (incluindo métodos HTTP, parâmetros, e exemplos de respostas).
	2.	Ferramenta:
	•	Utilizaremos Swagger ou OpenAPI para gerar essa documentação de forma automática a partir do código do Flask.
	3.	Processo:
	•	Passo 1: Adicionar anotações Swagger às rotas no Flask, descrevendo cada endpoint e seus parâmetros.
Exemplo de uma rota documentada:

@app.route('/login', methods=['POST'])
@swag_from({
  'description': 'Faz login no sistema com número de telefone e senha.',
  'parameters': [
      {
          'name': 'phone_number',
          'in': 'body',
          'type': 'string',
          'required': True,
          'description': 'Número de telefone do jogador.'
      },
      {
          'name': 'password',
          'in': 'body',
          'type': 'string',
          'required': True,
          'description': 'Senha do jogador.'
      }
  ],
  'responses': {
      200: {'description': 'Login bem-sucedido, retorna token JWT.'},
      400: {'description': 'Dados inválidos.'}
  }
})
def login_jogador():
    # lógica de login aqui
    pass


	•	Passo 2: Gerar a documentação completa em um arquivo swagger.json que poderá ser acessado via uma interface gráfica no Swagger UI.
	•	Passo 3: O Swagger UI será configurado para rodar junto com o backend, de forma que qualquer desenvolvedor possa acessar a URL /docs e visualizar a documentação completa e interativa das rotas.

	4.	Benefícios:
	•	Os desenvolvedores poderão testar e visualizar as respostas da API diretamente na interface gráfica do Swagger.
	•	Qualquer modificação nas rotas será automaticamente refletida na documentação, evitando inconsistências.

10.1.4 Versionamento de Documentação

	1.	Objetivo:
	•	Manter um histórico de versões da documentação para facilitar o acompanhamento de mudanças no projeto.
	2.	Processo:
	•	A cada versão significativa do projeto (ex: V1.0, V2.0), a documentação será atualizada e versionada no GitHub, assim como o código.
	•	Cada commit significativo deverá ser acompanhado de uma breve atualização na documentação, explicando as mudanças.
	3.	Ferramenta:
	•	O Git será usado para versionamento, e utilizaremos tags para marcar versões principais do projeto (ex: v1.0, v1.1).
	•	No README.md, será incluído um changelog com as principais mudanças de cada versão.

10.1.5 Finalização do MVP e Entrega

	1.	Testes Finais:
	•	Antes da entrega do MVP, realizaremos uma última rodada de testes automatizados e manuais para garantir que todas as funcionalidades do jogo estejam funcionando conforme o esperado.
	•	O foco será garantir a estabilidade do sistema, a segurança das transações e a experiência fluida do jogador.
	2.	Entrega do MVP:
	•	Após passar nos testes finais, o MVP será disponibilizado para uma primeira rodada de jogadores beta. Eles poderão acessar o jogo, explorar, lutar contra inimigos e interagir com o sistema de PayPal.
	•	Durante essa fase de testes, qualquer bug ou feedback será rapidamente corrigido e implementado.
	3.	Documentação Final do MVP:
	•	O README será atualizado com os últimos detalhes e um guia claro para o uso do MVP.
	•	A documentação das APIs estará completamente funcional via Swagger, e todos os logs de desenvolvimento estarão disponíveis.

Com todos esses passos concluídos, a versão MVP estará pronta para ser entregue e testada!