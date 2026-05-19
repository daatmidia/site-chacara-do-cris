# Site Chácara do Cris

Projeto institucional completo para divulgação de espaço de eventos.

## Como abrir localmente

1. Entre na pasta do projeto.
2. Abra o arquivo `index.html` no navegador.

Opcional com servidor local:

```bash
cd "Site Chácara do Cris"
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Estrutura

- `index.html`: página principal com todas as seções comerciais.
- `css/styles.css`: estilo visual profissional e responsivo.
- `js/main.js`: interações de menu e captura simples de lead.
- `pages/obrigado.html`: confirmação após envio do formulário.

## Melhorias recomendadas

- Substituir blocos da galeria por fotos reais do espaço.
- Conectar o formulário a WhatsApp/CRM/e-mail marketing.
- Publicar em domínio próprio com SSL.

## Publicação rápida (Netlify)

1. Crie uma conta em [Netlify](https://www.netlify.com/).
2. Clique em "Add new site" > "Deploy manually".
3. Arraste a pasta inteira `Site Chácara do Cris`.
4. O site entrará no ar com HTTPS automaticamente.

### Ajustes importantes antes de publicar

- Troque o número de WhatsApp em:
  - `index.html` (`data-whatsapp` no formulário)
  - `index.html` (link do botão flutuante)
- Atualize e-mail e telefone no rodapé.
- Substitua fotos de referência por fotos reais da chácara.
