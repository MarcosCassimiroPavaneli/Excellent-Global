<div align="center">

  <img src="logo-horizontal.png" alt="Excellent Global Idiomas" width="380">

  # 🌐 Excellent Global Idiomas — Unidade Osasco
  **Landing Page Oficial de Alta Conversão, Performance e Segurança**

  <p align="center">
    <i>Inglês e Espanhol com a Metodologia Não-Linear Japonesa e Filosofia Kaizen. Conquiste sua fluência até 6x mais rápido.</i>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Status-Produção_Pronto-emerald?style=for-the-badge&logo=vercel" alt="Status">
    <img src="https://img.shields.io/badge/SEO-Otimizado-blue?style=for-the-badge&logo=google" alt="SEO">
    <img src="https://img.shields.io/badge/LGPD-Em_Conformidade-amber?style=for-the-badge&logo=shield" alt="LGPD">
    <img src="https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel" alt="Deploy Vercel">
    <img src="https://img.shields.io/badge/Responsivo-Mobile_&_Desktop-blueviolet?style=for-the-badge" alt="Responsivo">
  </p>

  <p align="center">
    <a href="#-sobre-o-projeto">Sobre</a> •
    <a href="#-diferenciais-e-tecnologia">Diferenciais</a> •
    <a href="#-metodologia-não-linear--kaizen">Metodologia</a> •
    <a href="#-segurança--hardening">Segurança</a> •
    <a href="#-seo-técnico--lgpd">SEO & LGPD</a> •
    <a href="#-deploy">Deploy</a>
  </p>

</div>

---

## 📖 Sobre o Projeto

A **Excellent Global Idiomas - Unidade Osasco** é uma aplicação web desenvolvida com foco em **alta taxa de conversão (CRO)**, experiência do usuário fluida e identidade visual premium.

A plataforma apresenta a consagrada **Metodologia Não-Linear Japonesa**, desenvolvida pelo Prof. Marcos Shibuta, que já transformou a vida de mais de **200.000 alunos** em todo o Brasil. O projeto conecta interessados diretamente com a equipe pedagógica via WhatsApp de forma ágil e segura.

---

## ✨ Diferenciais e Destaques

* 🚀 **Conversão Acelerada via WhatsApp**: Integração direta com mensagens personalizadas que já identificam o curso de interesse (Inglês, Espanhol ou Dupla Fluência).
* 🪐 **Sistema Orbital 3D Real**: Animações interativas em CSS/JS com cálculo trigonométrico elíptico dos objetos escolares e turísticos orbitando o globo central.
* 📱 **Design 100% Responsivo & Mobile-First**: Otimização perfeita para smartphones, tablets e telas ultrawide.
* ⚡ **Performance Ultrarrápida**: Código enxuto em Vanilla JS e Tailwind CSS, sem dependências pesadas, garantindo pontuação máxima no Google PageSpeed.
* ♿ **Acessibilidade & Micro-Interações**: Navegação suave (*smooth scroll*), feedback visual ativo e modais acessíveis.

---

## 🧠 Metodologia Não-Linear & Filosofia Kaizen

Diferente do método tradicional engessado e puramente linear, a metodologia da **Excellent Global** baseia-se na neurociência e na melhoria contínua (*Kaizen*):

<div align="center">
  <br>
  <b>🌀 A Espiral Contínua de Fluência:</b><br><br>
  <code>Aprende → Pratica → Revisita → Melhora → Amplia → Pratica novamente</code>
  <br><br>
</div>

* **Sem decoreba gramatical**: O aluno aprende estruturas completas de fala desde a primeira aula.
* **100% Conversação ativa**: Prática dinâmica constante simulando viagens, reuniões e cotidiano.
* **Sem tarefas de casa**: Fixação completa realizada em sala de aula para respeitar a rotina do aluno.

---

## 🛡️ Segurança Frontend & Hardening

A aplicação conta com um conjunto robusto de práticas modernas de proteção:

* 🔒 **Higienização Estrita contra XSS**: Tratamento e escape de caracteres especiais e bloqueio de injeção de scripts maliciosos em todos os inputs.
* 🪤 **Armadilha Honeypot Anti-Bot**: Campo invisível para humanos que detecta e descarta envios automatizados de robôs de spam silenciosamente.
* ⏱️ **Debounce & Anti-Flooding**: Desativação imediata do botão de envio com estado de loading e cooldown para prevenir envios em massa.
* 🛡️ **Cabeçalhos de Segurança HTTP (`vercel.json`)**:
  * `X-Frame-Options: DENY` (Anti-Clickjacking)
  * `X-Content-Type-Options: nosniff` (Anti-MIME Sniffing)
  * `Referrer-Policy: strict-origin-when-cross-origin`
  * `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  * `Content-Security-Policy (CSP)` restritivo.
* 🔗 **Blindagem de Links Externos**: Todos os links externos contam com `target="_blank"` e `rel="noopener noreferrer"` para mitigar vulnerabilidades de *Reverse Tabnabbing*.

---

## 🔍 SEO Técnico & Conformidade LGPD

* **Metadados Semânticos**: Meta tags de título, descrição, canonical e robots (`index, follow`).
* **Open Graph Completo**: Pré-visualizações ricas e atrativas ao compartilhar links no **WhatsApp, Facebook e LinkedIn**.
* **Google Search Console**: Suporte nativo à tag de verificação de propriedade do Google.
* **Rastreamento Estrutural**: Arquivos `robots.txt` e `sitemap.xml` prontos para os mecanismos de busca.
* **Banner de Cookies (LGPD)**: Banner discreto e responsivo com persistência em `localStorage` e modais interativos de **Política de Privacidade** e **Termos de Uso**.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5 Semântico** (SEO e Acessibilidade)
* **CSS3 Moderno** (Glassmorphism, Gradientes HSL e Animações 3D)
* **Tailwind CSS** (Design System e Grid Responsivo)
* **JavaScript Puro (ES6+)** (Lógica, Sanitização e Interatividade)
* **Lucide Icons** (Ícones vetoriais modernos)
* **Node.js** (Servidor HTTP local para desenvolvimento)
* **Vercel** (Infraestrutura de deploy em nuvem com Edge Network)

---

## 📂 Estrutura do Projeto

```bash
Excellent-Global/
├── .agent/              # Diretrizes e habilidades do projeto
├── .cursor/             # Regras e convenções de código
├── img-*.png / .jpg     # Assets gráficos 3D dos satélites orbitais
├── index.html           # Documento principal com SEO e layout
├── logo*.png / .svg     # Logotipos oficiais horizontal e ícone
├── robots.txt           # Diretrizes de rastreamento para buscadores
├── script.js            # Lógica interativa, formulário, LGPD e 3D
├── server.js            # Servidor local Node.js na porta 3000
├── sitemap.xml          # Mapa do site estruturado
├── styles.css           # Estilizações globais, órbita 3D e efeitos
├── vercel.json          # Configuração de segurança HTTP e cache Vercel
├── video-cover.png      # Capa oficial do vídeo institucional
└── README.md            # Documentação técnica do repositório
```

---

## 🚀 Deploy em Produção (Vercel)

1. Acesse o painel da [Vercel](https://vercel.com).
2. Clique em **"Add New Project"** e selecione o repositório `MarcosCassimiroPavaneli/Excellent-Global`.
3. Mantenha as configurações padrão (Framework: *Other*) e clique em **"Deploy"**.
4. A Vercel aplicará automaticamente as regras do arquivo `vercel.json` e fornecerá o link com certificado SSL gratuito.

---

## ⚖️ Conformidade Jurídica

* **Unidade**: Excellent Global Idiomas - Unidade Osasco
* **Localização**: Osasco e Região Metropolitana - SP
* **Contato**: [excellentglobalosasco@gmail.com](mailto:excellentglobalosasco@gmail.com) | WhatsApp: [(11) 96871-1060](https://wa.me/5511968711060)
* **Copyright**: © 2026 Excellent Global Idiomas - Unidade Osasco. Todos os direitos reservados.

---

<div align="center">
  <sub>Desenvolvido com excelência técnica, rigor estético e foco em conversão.</sub>
</div>
