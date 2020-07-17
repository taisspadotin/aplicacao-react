### Funcionamento da aplicação
Ao entrar na aplicação o usuário encontra a tela de login, para acessar o sistema o usuário deve se cadastrar, o cadastro é salvo em um state do redux, e então o usuário é redirecionado para a tela de login, e ao realizar o login corretamente ele será rediecionado para a tela de aplicação, que só é possivel acessar após a realização do login, caso o usuário tente acessar a pagina "aplicação" sem estar logado ele será redirecionado para a tela de login.
Na tela de aplicação o usuário pode cadastrar uma imagem que tem um id e um título, ambos obrigatórios, ao clicar em salvar os dados são enviados para a API e os dados retornados são apresentados na tela, assim como a imagem correspondente ao ID que a pessoa informou.
Ao clicar em um registro na tabela o mesmo é selecionado e a pessoa pode alterar ou excluir o registro, se optar por alterar os dados são enviados para a api(porem como a api é apenas com dados mocados ele não acha o id que foi retornado do POST), se e a pessoa optar por excluir, então uma requisição DELETE é enviada a API e os dados são removidos da tela, assim como a imagem.
O site é reponsivo.

### `Usando a aplicação`
```
npm install
npm start
```

### `O que foi utilizado?`
- react-redux
- axios
- react-router-dom
- sass
- bootstrap
- semantic ui

<img src="https://raw.githubusercontent.com/taisspadotin/aplicacao-react/master/images/pic1.png"/>
<img src="https://raw.githubusercontent.com/taisspadotin/aplicacao-react/master/images/pic2.png"/>
<img src="https://raw.githubusercontent.com/taisspadotin/aplicacao-react/master/images/pic3.png"/>
