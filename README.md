# 🎮⚽ XPTO inc. — Evento 13.06

Site de confirmação de presença para o evento de videogame + telão da Copa.

## Estrutura do projeto

```
xpto-evento/
├── public/
│   └── index.html        ← o site
├── api/
│   └── confirmar.js      ← API que envia os e-mails
├── vercel.json           ← configuração do Vercel
├── .env.example          ← variáveis de ambiente (modelo)
└── .gitignore
```

---

## PASSO 1 — Criar conta no Resend e obter API Key

1. Acesse **https://resend.com** e crie uma conta gratuita
2. No painel, clique em **"API Keys"** → **"Create API Key"**
3. Copie a chave (começa com `re_...`)
4. Vá em **"Domains"** → adicione e verifique o domínio `xptoinc.com.br`
   - O Resend vai pedir que você adicione registros DNS (TXT e MX) no seu provedor de domínio
   - Após verificado, o `FROM` do e-mail vai funcionar como `eventos@xptoinc.com.br`

> ⚠️ Enquanto o domínio não estiver verificado, você pode usar `onboarding@resend.dev` para testes, mas só envia para o e-mail da sua conta Resend.

---

## PASSO 2 — Subir no GitHub

### Se for a primeira vez:

Abra o terminal (no Mac: `Command + Espaço` → "Terminal") e rode:

```bash
# 1. Instala o Git (se não tiver)
# Mac: já vem instalado. Windows: baixe em https://git-scm.com

# 2. Configure seu nome e e-mail (só na primeira vez)
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Criar repositório no GitHub:

1. Acesse **https://github.com** → faça login
2. Clique no **"+"** no canto superior direito → **"New repository"**
3. Nome do repositório: `xpto-evento`
4. Deixe **Private** (recomendado)
5. **NÃO** marque "Add a README" — clique em **"Create repository"**

### Enviar os arquivos:

No terminal, navegue até a pasta do projeto e rode os comandos abaixo **um por vez**:

```bash
cd xpto-evento          # entra na pasta (ajuste o caminho se necessário)

git init                # inicializa o repositório local
git add .               # adiciona todos os arquivos
git commit -m "primeiro commit — site evento XPTO"   # salva

# Conecta ao GitHub (substitua SEU_USUARIO pelo seu usuário do GitHub)
git remote add origin https://github.com/SEU_USUARIO/xpto-evento.git

git branch -M main
git push -u origin main # envia para o GitHub
```

O GitHub vai pedir seu usuário e senha. Para senha, use um **Personal Access Token**:
- GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token → marque `repo` → Generate → copie e cole no lugar da senha

---

## PASSO 3 — Deploy no Vercel

1. Acesse **https://vercel.com** → faça login com sua conta GitHub
2. Clique em **"Add New Project"**
3. Selecione o repositório `xpto-evento`
4. Deixe tudo padrão (Vercel detecta automaticamente)
5. Antes de clicar em Deploy, clique em **"Environment Variables"** e adicione:

   | Nome | Valor |
   |------|-------|
   | `RESEND_API_KEY` | `re_sua_chave_aqui` |

6. Clique em **"Deploy"** 🚀

Em ~1 minuto o site estará no ar com uma URL tipo `https://xpto-evento.vercel.app`

---

## PASSO 4 — Domínio personalizado (opcional)

No painel do Vercel → seu projeto → **"Settings"** → **"Domains"**:
- Adicione `evento.xptoinc.com.br` (ou o subdomínio que quiser)
- O Vercel vai mostrar os registros DNS para adicionar no seu provedor

---

## Como atualizar o site depois

Sempre que quiser mudar algo, edite os arquivos e rode:

```bash
git add .
git commit -m "descrição do que mudou"
git push
```

O Vercel detecta automaticamente e republica em ~30 segundos.

---

## Fluxo dos e-mails

Quando alguém confirma presença:

1. **Convidado** recebe e-mail bonito com os detalhes do evento e suas informações
2. **mariana.silva@xptoinc.com.br** recebe notificação com todos os dados da inscrição (nome, e-mail, tipo, nº de pessoas, intolerâncias, observações)
