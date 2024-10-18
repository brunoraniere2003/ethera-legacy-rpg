# Ethera Legacy - Markdown

## Visão Geral e Funcionalidades

### 1. Introdução
  - **Nome do Jogo**: Ethera Legacy
  - Descrição e objetivos do jogo.

### 2. Classes e Atributos
  - Descrição das classes iniciais (Mago, Guerreiro, Assassino, Arqueiro) e seus atributos.
  - Atributos de combate: Vida, Dano, Velocidade de Ataque, Esquiva, Chance de Crítico, Dano Crítico.

### 3. Sistema de Atributos e Poder de Combate
  - Cálculo de poder de combate e impacto dos itens.
  - Como o cansaço afeta o poder de combate e o cálculo de vitória/derrota.

### 4. Drops de Itens e Raridades
  - Explicação sobre a raridade dos itens e suas chances de drop.
  - Poder de combate dos itens e como os atributos são afetados.

### 5. Sistema de Progressão e Tier
  - Explicação do sistema de Tier e como o jogador evolui.
  - Cálculo de XP necessário para subir de Tier e evolução de atributos.

### 6. Cálculo de Vitória e Derrota no Combate
  - Fórmula de cálculo de chances de vitória.
  - Ganho de XP, aumento de cansaço e o impacto da derrota no poder de combate.

### 7. Sistema de Itens e Equipamentos
  - Itens e como eles influenciam os atributos do jogador.
  - Raridades dos itens e atributos afetados por itens dropados.

### 8. Sistema de Missões e Recompensas
  - Tipos de missões e recompensas (XP, itens, criptomoedas).
  - Missões dinâmicas e temporárias.

### 9. Sistema de Pets
  - Como adquirir pets e seus bônus no combate e na exploração.
  - Evolução dos pets e impacto na jogabilidade.

### 10. Auto-Regulamento e Balanceamento
  - Escalonamento dinâmico dos inimigos e ajuste de dificuldades com base no Tier.
  - Recompensas proporcionais e manutenção da dificuldade com o cansaço.

### 11. Previsão de Atualizações Futuras
  - Modo multiplayer e PvP.
  - Novos biomas, classes, economia expandida, e sistema de guildas.
  - Introdução de um modo história e novas funcionalidades.

## Introdução

**Nome do Jogo**: **Ethera Legacy**

**Descrição Geral**:  
**Ethera Legacy** é um RPG de texto com combate por turnos, exploração de biomas e foco na **coleção e comercialização de itens**. O jogador explora o mundo, enfrenta desafios e coleta itens que podem ser registrados como NFTs, permitindo sua **compra e venda**. Integrado ao blockchain (Ethereum e Matic), os jogadores podem **monetizar seus itens**, oferecendo a oportunidade de **ganhar dinheiro real** ao comercializá-los no marketplace. O jogo conta com progressão infinita, adaptando-se conforme o jogador evolui.

## Classes e Atributos

Ethera Legacy oferece quatro classes principais no lançamento do jogo, cada uma com seus atributos base. O jogador escolherá uma classe no início da aventura, que determinará seu estilo de combate e atributos. Conforme o jogo evolui, os jogadores podem adquirir equipamentos para melhorar os atributos e subir no **Tier** conforme seu poder cresce.

### Atributos de Combate

Os atributos principais que influenciam o combate são:

1. **Vida (v)**: Quantidade de pontos de vida.
2. **Dano (d)**: O valor de ataque base.
3. **Velocidade de Ataque (va)**: Influencia a frequência dos ataques.
4. **Esquiva (e)**: Probabilidade de evitar ataques.
5. **Chance de Crítico (cc)**: Probabilidade de realizar um ataque crítico.
6. **Dano Crítico (dc)**: Dano adicional causado em ataques críticos.

### Classes Iniciais e Atributos

Cada classe possui um conjunto de atributos base:

- **Mago**:
  - Vida (v): 100
  - Dano (d): 90
  - Velocidade de Ataque (va): 105
  - Esquiva (e): 85
  - Chance de Crítico (cc): 115
  - Dano Crítico (dc): 105
  
- **Arqueiro**:
  - Vida (v): 85
  - Dano (d): 95
  - Velocidade de Ataque (va): 115
  - Esquiva (e): 100
  - Chance de Crítico (cc): 110
  - Dano Crítico (dc): 95
  
- **Assassino**:
  - Vida (v): 60
  - Dano (d): 110
  - Velocidade de Ataque (va): 120
  - Esquiva (e): 115
  - Chance de Crítico (cc): 90
  - Dano Crítico (dc): 105
  
- **Guerreiro**:
  - Vida (v): 130
  - Dano (d): 90
  - Velocidade de Ataque (va): 70
  - Esquiva (e): 80
  - Chance de Crítico (cc): 100
  - Dano Crítico (dc): 120

## Sistema de Atributos e Poder de Combate

### Cálculo do Poder de Combate
O poder de combate do jogador é calculado com base nos **atributos de combate** e nos itens equipados. O cálculo segue o seguinte formato:

1. **Soma dos Atributos**:  
   - A média dos seis atributos principais (vida, dano, velocidade de ataque, esquiva, chance de crítico, dano crítico) determina o poder bruto do jogador.
   - Fórmula:  
   \[
   \text{Poder Bruto} = \frac{(v + d + va + e + cc + dc)}{6}
   \]
   - Exemplo (Assassino):  
     \[
     \text{Poder Bruto} = \frac{(60 + 110 + 120 + 115 + 90 + 105)}{6} = 100
     \]

2. **Adição de Itens**:  
   - Os itens equipados adicionam diretamente ao poder de combate.
   - Exemplo:  
     - **Adaga**: +10
     - **Capa**: +10
     - **Anel**: +5  
     \[
     \text{Poder Total} = \text{Poder Bruto} + \text{Itens} = 100 + 25 = 125
     \]

### Impacto do Cansaço no Poder de Combate
O **cansaço** influencia diretamente no poder de combate do jogador, reduzindo seu valor total conforme o cansaço aumenta.

1. **Cansaço Pós-Derrota**:  
   - Se o jogador for derrotado, o cansaço dele aumentará no valor da **chance de perder**.  
   - Exemplo: Se a chance de perder era **32.5%**, o cansaço aumenta em **32.5%**.

2. **Redução do Poder pelo Cansaço**:  
   - O poder de combate final será reduzido conforme o cansaço atual.  
   - Exemplo:  
     - Se o **cansaço** do jogador é **32.5%**, o poder de combate é reduzido em **32.5%**.
     - Se o **poder total** do jogador era **125**:  
     \[
     \text{Poder Ajustado} = 125 - (32.5\% \times 125) = 125 - 40.625 = 84.375
     \]
     - O novo poder de combate do jogador será **84.375**.

### Impacto no Combate
O poder total de combate define a **chance de vitória** em batalhas. O sistema calcula as chances de acordo com o poder do jogador comparado ao do inimigo.

- **Fórmula para chance de vitória**:  
  \[
  \text{Chance de Vitória} = \frac{\text{Poder do Jogador}}{\text{Poder do Jogador} + \text{Poder do Inimigo}}
  \]
  - Exemplo:  
    Se o poder total do jogador é **125** e o poder do inimigo é **60**:  
    \[
    \frac{125}{125 + 60} = 67.5\% \text{ de chance de vitória.}
    \]

## Drops de Itens e Raridades

Após cada combate, o jogador tem a chance de obter itens, dependendo das suas **chances de perda** na batalha.

### Cálculo de Chance de Drop
A chance de drop de itens é equivalente à **chance de perda** no combate.

- **Fórmula**:  
  \[
  \text{Chance de Drop} = \text{Chance de Perder}
  \]
  - Exemplo: Se a chance de perda era **32.5%**, a chance de drop será **32.5%**.

### Raridade dos Itens
A raridade do item será sorteada com base nas seguintes probabilidades:

- **Comum**: 69.40%  
- **Raro**: 20.81%  
- **Super Raro**: 6.94%  
- **Épico**: 2.08%  
- **Místico**: 0.69%  
- **Lendário**: 0.07%

Essas probabilidades determinam o quão raro é o item dropado após uma vitória.

### Poder de Combate dos Itens
O poder de combate do item é baseado no poder atual do jogador e na raridade do item.

- **Fórmula**:  
  \[
  \text{Poder do Item} = 5\% \times \text{Poder Atual do Jogador} \times \text{Multiplicador da Raridade}
  \]
  - **Multiplicadores de Raridade**:
    - Comum: x1
    - Místico: x5
    - Lendário: x6
  - Exemplo:  
    Se o poder de combate do jogador é **100** e o item é **lendário**, o cálculo será:
    \[
    \text{Poder do Item} = 0.05 \times 100 \times 6 = 30 \text{ de poder de combate.}
    \]

### Influência dos Atributos no Item
O item terá um número de atributos influenciados, baseado na sua raridade:

- **Item Comum**:  
  - Afeta **1 atributo**.  
  - Exemplo: +2 de dano.
  
- **Item Super Raro**:  
  - Afeta **3 atributos**.  
  - Exemplo: +4 de dano, +2 de esquiva, +1 de chance de crítico.

Os atributos afetados serão escolhidos aleatoriamente.

## Sistema de Progressão e Tier

Em **Ethera Legacy**, a progressão do jogador é determinada pelo aumento do **poder de combate** e a mudança de **Tier**, em vez de um sistema tradicional de níveis numéricos.

### Sistema de Tier
O **Tier** do jogador é definido pelo seu **poder bruto sem itens**. Isso indica o nível geral de força do jogador.

- **Cálculo do Tier**:  
  O Tier é calculado como:  
  \[
  \text{Tier} = \text{floor} \left( \frac{\text{Poder Bruto}}{100} \right)
  \]
  - Exemplo:  
    Se o poder bruto do jogador é **645**, o Tier será:  
    \[
    \text{Tier} = \text{floor} \left( \frac{645}{100} \right) = 6
    \]

### Evolução de Atributos
O jogador evolui ao atingir **determinados marcos de experiência (XP)**.

1. **XP necessário para evoluir**:  
   A fórmula para o XP necessário para "subir de nível" é:
   \[
   \text{XP Necessário} = 100 + ( \text{Tier} - 1 ) \times 50
   \]
   - Exemplo:  
     Se o jogador está no Tier 3, o XP necessário será:  
     \[
     100 + (3 - 1) \times 50 = 200 XP
     \]

2. **Escolha de Atributos**:  
   Quando o jogador atinge a quantidade necessária de XP, ele poderá escolher entre **duas opções de atributos** para melhorar.

   - Um sorteio aleatório determina **quais atributos** estarão disponíveis para melhorar.
   - O **valor de melhoria** do atributo será definido por uma **raridade sorteada**. A melhoria é calculada como:  
     \[
     \text{Melhoria de Atributo} = 30 \times \text{Multiplicador da Raridade}
     \]
     - **Multiplicadores de Raridade**:
       - Comum: x1
       - Místico: x5
       - Lendário: x6

   - Exemplo:  
     Se o jogador sorteia a raridade **Lendário**, a melhoria será:  
     \[
     30 \times 6 = +180 \text{ em um atributo}
     \]

## Cálculo de Vitória e Derrota no Combate

O combate em **Ethera Legacy** é determinado por um sistema de rolagem, baseado no poder de combate do jogador e do inimigo. A rolagem define as chances de vitória, e os resultados influenciam diretamente a experiência e o cansaço do jogador.

### Cálculo de Chance de Vitória

As chances de vitória são calculadas com base no poder de combate do jogador comparado ao do inimigo.

- **Fórmula para chance de vitória**:  
  \[
  \text{Chance de Vitória} = \frac{\text{Poder do Jogador}}{\text{Poder do Jogador} + \text{Poder do Inimigo}}
  \]
  - Exemplo:  
    Se o poder total do jogador é **125** e o poder do inimigo é **60**:  
    \[
    \frac{125}{125 + 60} = 67.5\% \text{ de chance de vitória.}
    \]

### Experiência (XP) Ganha

A experiência (XP) ganha em uma batalha é baseada na **chance de perder**.

- **Fórmula para ganho de XP**:  
  \[
  \text{XP Ganho} = \text{Chance de Perder}
  \]
  - Exemplo:  
    Se a chance de perder era **32.5%**, o jogador ganha **32.5 XP**.

### Cansaço do Jogador

O cansaço é aumentado após cada batalha, dependendo do resultado.

1. **Cansaço após a vitória**:  
   - O cansaço aumenta em **1/8 da chance de perder**.
   - Fórmula:  
     \[
     \text{Cansaço (vitória)} = \frac{\text{Chance de Perder}}{8}
     \]
     - Exemplo:  
       Se a chance de perder era **32.5%**, o cansaço aumenta em **4.06%**.

2. **Cansaço após a derrota**:  
   - O cansaço aumenta diretamente na proporção da **chance de perder**.
   - Fórmula:  
     \[
     \text{Cansaço (derrota)} = \text{Chance de Perder}
     \]
     - Exemplo:  
       Se a chance de perder era **32.5%**, o cansaço aumenta em **32.5%**.

### Redução de Poder por Cansaço

O cansaço reduz diretamente o poder de combate do jogador.

- **Fórmula de redução de poder**:  
  \[
  \text{Poder Ajustado} = \text{Poder Total} - (\text{Cansaço Atual} \times \text{Poder Total})
  \]
  - Exemplo:  
    Se o poder do jogador é **125** e o cansaço atual é **32.5%**:  
    \[
    \text{Poder Ajustado} = 125 - (0.325 \times 125) = 84.375
    \]

O jogador lutará com esse poder reduzido em combates futuros até que o cansaço seja recuperado.

## Sistema de Itens e Equipamentos

Os itens em **Ethera Legacy** têm um papel fundamental na evolução do jogador, adicionando diretamente ao **poder de combate**. Eles são adquiridos por meio de drops após combates e têm diferentes níveis de raridade, que influenciam quantos e quais atributos o item afeta.

### Itens e Atributos

Os itens afetam diretamente o **poder de combate** do jogador, sendo somados ao seu poder total. Cada item pode impactar um ou mais dos seis atributos principais (vida, dano, velocidade de ataque, esquiva, chance de crítico, dano crítico).

- **Exemplo de Itens**:
  - **Adaga**: +10 de dano.
  - **Capa**: +10 de esquiva.
  - **Anel**: +5 de chance de crítico.

### Raridades dos Itens

Os itens são classificados por níveis de raridade, que determinam quantos atributos serão afetados e a potência do item.

- **Raridades e Chances de Drop**:
  - **Comum**: 69.40%
  - **Raro**: 20.81%
  - **Super Raro**: 6.94%
  - **Épico**: 2.08%
  - **Místico**: 0.69%
  - **Lendário**: 0.07%

### Poder de Combate dos Itens

O poder de combate de um item é baseado no **poder atual do jogador** e na raridade do item.

- **Fórmula**:  
  \[
  \text{Poder do Item} = 5\% \times \text{Poder Atual do Jogador} \times \text{Multiplicador de Raridade}
  \]
  - **Multiplicadores de Raridade**:
    - Comum: x1
    - Místico: x5
    - Lendário: x6
  - Exemplo:  
    Se o poder de combate do jogador é **100** e o item é **Lendário**, o cálculo será:
    \[
    \text{Poder do Item} = 0.05 \times 100 \times 6 = 30 \text{ de poder de combate.}
    \]

### Atributos Aleatórios dos Itens

Cada item terá um número de atributos afetados, baseado na sua raridade. Os atributos são escolhidos aleatoriamente entre os seis principais (vida, dano, velocidade de ataque, esquiva, chance de crítico, dano crítico).

- **Exemplo de Atributos por Raridade**:
  - **Item Comum**: Afeta **1 atributo**.
    - Exemplo: +2 de dano.
  - **Item Super Raro**: Afeta **3 atributos**.
    - Exemplo: +4 de dano, +2 de esquiva, +1 de chance de crítico.

Os atributos influenciados são sorteados aleatoriamente no momento em que o item é dropado.

## Sistema de Missões e Recompensas

As missões em **Ethera Legacy** são uma forma fundamental de progressão, oferecendo aos jogadores a chance de ganhar **experiência (XP)**, **itens**, e até mesmo **criptomoedas**. As missões são divididas por tipo e dificuldade, escalando conforme o jogador evolui.

### Tipos de Missões

1. **Missões de Exploração**:  
   - O jogador explora biomas, descobre locais ocultos e enfrenta inimigos.
   - Recompensas: Itens comuns a raros, XP, e moedas do jogo.

2. **Missões de Combate**:  
   - Focadas em derrotar inimigos específicos ou chefes.
   - Recompensas: Itens de maior raridade (Raro a Lendário), XP, e chance de drop de itens especiais.

3. **Missões de Coleta**:  
   - O jogador deve reunir itens específicos ou materiais raros.
   - Recompensas: Itens de consumo, como poções, além de XP e moedas.

### Recompensas das Missões

As recompensas variam de acordo com o tipo e a dificuldade da missão. Elas incluem:

1. **Experiência (XP)**:
   - Concedida por completar missões de qualquer tipo.
   - Missões mais difíceis concedem mais XP, ajudando o jogador a progredir mais rápido no sistema de **Tier**.

2. **Itens**:
   - Itens comuns a raros são concedidos em missões de exploração e combate.
   - A raridade do item pode ser influenciada pela dificuldade da missão e pela chance de drop.

3. **Moedas do Jogo**:
   - Usadas para comprar itens básicos, como poções, dentro do jogo.

4. **Criptomoedas**:
   - Algumas missões especiais podem oferecer pequenas quantidades de criptomoedas como recompensa.
   - Criptomoedas podem ser usadas para transações no marketplace ou para registrar itens como NFTs.

### Missões Dinâmicas

Missões podem ser adaptáveis ao nível do jogador, aumentando a dificuldade e recompensas conforme o jogador evolui.

1. **Missões de Alta Dificuldade**:
   - Oferecem itens de maior raridade e maiores quantidades de XP.
   - Inimigos mais poderosos aparecem nessas missões, requerendo maior estratégia.

2. **Missões Temporárias**:
   - Eventos especiais, sazonais ou diários, que oferecem recompensas únicas e bônus temporários.
   - Missões sazonais podem incluir desafios que afetam diretamente o mundo do jogo (ex: mudanças no clima ou bioma).

## Sistema de Pets

Os **pets** em **Ethera Legacy** são companheiros que ajudam o jogador tanto no combate quanto na exploração. Eles oferecem bônus em atributos e podem evoluir conforme o jogador progride. Pets também podem ser coletados como itens raros, servindo como suporte no jogo.

### Aquisição de Pets

1. **Drop de Pets**:
   - Pets podem ser obtidos como itens raros ao derrotar inimigos ou completar missões de alta dificuldade.
   - A raridade do pet afeta seus bônus e habilidades.

2. **Marketplace**:
   - Pets podem ser comprados e vendidos no marketplace, assim como os outros itens do jogo.

3. **Exploração**:
   - Em áreas específicas (biomas), pets raros podem ser encontrados através de exploração.
   - Certos biomas têm maior chance de conter pets específicos.

### Impacto dos Pets no Combate

Pets oferecem **bônus diretos** aos atributos de combate do jogador. Esses bônus variam conforme a raridade e tipo de pet.

- **Exemplo de Bônus**:
  - **Pet Comum**: +5 de velocidade de ataque.
  - **Pet Raro**: +10 de dano e +5 de esquiva.

Os bônus fornecidos pelos pets são aplicados durante o combate, aumentando a eficácia do jogador em batalhas.

### Impacto dos Pets na Exploração

Pets podem melhorar a velocidade de exploração, ajudando o jogador a se mover mais rápido pelos biomas e encontrar itens escondidos.

- **Velocidade de Movimento**:  
  Alguns pets aumentam a velocidade de movimentação do jogador pelo mapa.
  - Exemplo: Um pet raro pode aumentar a velocidade de movimento em **10%**, permitindo que o jogador cubra mais terreno em menos tempo.

- **Localização de Itens**:  
  Pets podem ajudar o jogador a localizar itens raros ou áreas secretas dentro de um bioma.
  - Exemplo: Um pet lendário pode aumentar as chances de encontrar itens de maior raridade durante a exploração.

### Evolução dos Pets

Os pets podem evoluir conforme o jogador avança. A evolução aumenta os bônus fornecidos e pode desbloquear novas habilidades de suporte.

1. **Progressão de Pets**:
   - Pets ganham experiência junto com o jogador.
   - Quando um pet atinge um certo nível de experiência, ele pode evoluir, aumentando seus bônus.

2. **Evolução por Itens**:
   - Alguns pets podem ser evoluídos com o uso de itens raros, encontrados durante missões ou comprados no marketplace.

## Auto-Regulamento e Balanceamento

O sistema de **auto-regulamento e balanceamento** em **Ethera Legacy** é projetado para garantir que o jogo se mantenha desafiador, justo e dinâmico, adaptando-se automaticamente ao progresso do jogador. Ele ajusta a dificuldade dos inimigos e o poder dos desafios conforme o jogador evolui.

### Cálculo Dinâmico de Combate

O jogo utiliza um sistema dinâmico para calcular o poder dos NPCs e inimigos, com base no **Tier** e no **poder de combate** do jogador.

1. **Escalonamento dos Inimigos**:
   - O poder dos inimigos é escalado conforme o jogador sobe de **Tier**.  
   - **Fórmula para ajuste de inimigos**:  
     \[
     \text{Poder do Inimigo} = \text{Tier do Jogador} \times \text{Multiplicador de Dificuldade}
     \]
     - O multiplicador de dificuldade varia de acordo com a região e a missão, garantindo que o jogador enfrente inimigos proporcionais à sua evolução.

2. **Desafios Progressivos**:
   - As missões, eventos e inimigos se tornam mais desafiadores conforme o jogador avança no jogo, aumentando a complexidade do combate e os tipos de inimigos.
   - Exemplo: Um jogador no Tier 5 enfrentará inimigos que possuem habilidades e atributos mais avançados em comparação com um jogador no Tier 1.

### Balanceamento Automático dos NPCs

Os NPCs e inimigos são balanceados automaticamente para garantir que o jogador sempre tenha uma **experiência desafiadora**, independentemente de sua evolução.

1. **Atributos dos NPCs**:
   - NPCs terão seus atributos ajustados conforme o poder de combate do jogador aumenta.
   - **Exemplo**: Se o jogador aumenta muito seu poder de ataque, os NPCs terão atributos de defesa mais altos para manter o combate equilibrado.

2. **Sistema de Balanceamento Regional**:
   - Algumas regiões do jogo são designadas para serem mais desafiadoras do que outras, independentemente do nível do jogador.
   - Isso permite que jogadores mais avançados busquem regiões mais perigosas para recompensas maiores.

### Recompensas Proporcionais

O sistema de auto-regulamento também influencia as recompensas que o jogador recebe.

1. **Escala de Recompensas**:
   - As recompensas (XP, itens, criptomoedas) são proporcionais à dificuldade do inimigo ou missão.
   - Quanto mais difícil a missão ou inimigo, maior será a recompensa.
   
2. **Itens Ajustados ao Tier**:
   - Os itens dropados são ajustados ao **Tier do jogador**, garantindo que os itens obtidos tenham relevância para o nível atual.
   - **Exemplo**: Um jogador no Tier 5 terá chances maiores de receber itens raros ou épicos em comparação com um jogador no Tier 1, mesmo em áreas comuns.

### Manutenção da Dificuldade

1. **Cansaço e Regeneração**:
   - O sistema de cansaço introduz um elemento de dificuldade adicional, forçando o jogador a lidar com desafios maiores à medida que se cansa, até que o cansaço seja recuperado.
   - A **regeneração do cansaço** ocorre automaticamente ao longo do tempo ou ao realizar determinadas ações, como descansar em áreas seguras.

2. **Ajustes Baseados no Desempenho**:
   - Se o jogador estiver superando os desafios com facilidade, o jogo pode aumentar automaticamente a dificuldade, ajustando os atributos dos inimigos e a complexidade das missões.

## Previsão de Atualizações Futuras

O desenvolvimento de **Ethera Legacy** será contínuo, com várias funcionalidades e expansões planejadas para futuras atualizações. Essas atualizações irão enriquecer o conteúdo do jogo, introduzir novas mecânicas e expandir o universo.

### Multiplayer

1. **Adição de Modo Cooperativo**:
   - Um dos principais focos futuros será a introdução do modo multiplayer cooperativo, onde os jogadores poderão unir forças em combates e missões.
   - Sistema de **grupos** com jogadores compartilhando recompensas, XP e lutando juntos contra inimigos mais fortes.

2. **Combates PvP (Jogador contra Jogador)**:
   - Um sistema de combates PvP permitirá que jogadores se enfrentem para testar suas habilidades e estratégias de combate.
   - Recompensas especiais, incluindo itens de alto nível e criptomoedas, serão oferecidas para os vencedores de torneios PvP.

### Sistema de Guildas/Clãs

1. **Formação de Clãs**:
   - Jogadores poderão criar ou se juntar a clãs, cooperando em eventos exclusivos e compartilhando recursos.
   - Os clãs terão missões dedicadas, além de guerras de clãs e conquistas coletivas.

2. **Guilda Marketplace**:
   - Um sistema de marketplace exclusivo para guildas, onde membros podem trocar itens ou investir em melhorias coletivas para fortalecer o clã.

### Novos Biomas e Expansões

1. **Introdução de Novos Biomas**:
   - Novas áreas serão introduzidas com biomas únicos, contendo inimigos, missões e itens exclusivos.
   - Cada bioma oferecerá novos desafios e oportunidades de exploração.

2. **Eventos Sazonais e Temporários**:
   - Eventos limitados por tempo com temas sazonais (como inverno, verão, feriados), trazendo missões especiais e recompensas exclusivas.
   - Esses eventos poderão incluir mudanças climáticas nos biomas e inimigos temáticos.

### Novas Classes e Atributos

1. **Introdução de Novas Classes**:
   - Novas classes serão adicionadas, oferecendo mais opções de gameplay e estratégias de combate.
   - Cada classe terá seus atributos base e estilo de jogo único, com novas habilidades para explorar.

2. **Atributos Secundários**:
   - Com o tempo, novos **atributos secundários** podem ser introduzidos, expandindo o sistema de personalização e progressão.
   - Esses atributos poderiam influenciar resistência a status negativos (como envenenamento) ou melhorar habilidades especiais.

### Sistema de Economia Expandido

1. **Marketplace Avançado**:
   - Expansão do sistema de marketplace, com mais funcionalidades para negociação de itens e criptomoedas entre jogadores.
   - Introdução de novas formas de personalizar e registrar itens no marketplace.

2. **Integração com Outras Criptomoedas**:
   - Futuras atualizações podem integrar outras criptomoedas no jogo, além de Ethereum e Matic, permitindo maior flexibilidade nas transações.

### Novas Funcionalidades e Modo História

1. **Modo História**:
   - Introdução de uma campanha narrativa para os jogadores que preferem seguir uma jornada com uma história envolvente, missões sequenciais e eventos especiais.
   - O modo história será paralelo ao mundo aberto, dando aos jogadores uma nova forma de engajamento.

2. **Sistema de Relíquias**:
   - Introdução de **relíquias antigas**, itens de grande poder que os jogadores podem encontrar e usar para influenciar o mundo do jogo, desbloquear áreas ou obter vantagens temporárias.
