**aluno:Alysson Rodrigo**
**aula:10**

Criação da pasta shared e do arquivo dishes.js

De inicio,criei uma pasta chamada "shared" dentro do diretório "src", onde agrupei as informações sobre os pratos. Dentro dessa pasta, desenvolvi um arquivo chamado "dishes.js", que exporta uma constante denominada DISHES, a qual contém um array de objetos, cada um representando um prato disponível no cardápio.
Exemplo do conteúdo de dishes.js:

export const DISHES = [
  {
    id: 0,
    name: 'Uthappizza',
    image: 'assets/images/uthappizza.png',
    category: 'mains',
    label: 'Hot',
    price: '4.99',
    description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza...',
    comments: [ /* Lista de comentários */ ]
  },
  {
    id: 1,
    name: 'cupcake',
    image:  'assets/images/cup.jpg',
    category: 'appetizer',
    label: '',
    price: '1.99',
    description: 'Deep fried Zucchini coated with mildly spiced Chickpea flour batter...',
    comments: [ /* Lista de comentários */ ]
  },
  /* Mais pratos... */
];
Esses dados foram importados para o componente App.js para serem passados como props para o componente MenuComponent.

Alteração do componente MenuComponent.js

O componente MenuComponent foi refatorado para usar o Card do reactstrap, conforme solicitado. A funcionalidade de renderizar os pratos foi ajustada para utilizar esse componente, que proporciona uma interface mais limpa e interativa.

Estrutura do Menu

O Menu renderiza uma lista de pratos em cartões (Card), onde cada prato é exibido com uma imagem e o nome. Ao clicar em um prato, o estado selectedDish é atualizado para exibir as informações detalhadas sobre o prato selecionado.

Exemplo de implementação do componente MenuComponent:

import React, { useState } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

const Menu = (props) => {
  const [selectedDish, setSelectedDish] = useState(null);
  
  const onDishSelect = (dish) => {
    setSelectedDish(dish);
  };

  const renderDish = (dish) => {
    if (dish != null) {
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    } else {
      return <div></div>;
    }
  };

  const menu = props.dishes.map((dish) => {
    return (
      <div className="col-12 col-md-5 m-1" key={dish.id}>
        <Card onClick={() => onDishSelect(dish)}>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
          </CardImgOverlay>
        </Card>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{menu}</div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {renderDish(selectedDish)}
        </div>
      </div>
    </div>
  );
};

export default Menu;
Refatoração do componente App.js

No arquivo App.js, fiz a importação de dishes.js, que contém a constante DISHES, e a utilizei como props para o componente Menu. Dessa forma, as informações sobre os pratos estão disponíveis no Menu e podem ser apresentadas na forma de cards. A estrutura da Navbar foi preservada para que o título "Ristorante Con Fusion" apareça na parte superior da página.

Exemplo de App.js:

import './App.css';
import React, { useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
import { DISHES } from './shared/dishes';

function App() {
  const [dishes] = useState(DISHES);

  return (
    <div>
      <Navbar dark color="primary" expand="md">
        <div className="container">
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          <div>Aluno: Fulano de Tal</div>
        </div>
      </Navbar>
      <Menu dishes={dishes} />
    </div>
  );
}

export default App;
Testes e verificação

Realizei um teste na interação entre o menu e as informações dos pratos. Ao selecionar um prato, os detalhes adequados aparecem de forma correta. Também conferi que todas as informações dos pratos (nome, imagem, descrição) estavam sendo mostradas corretamente no componente Card.

Conclusão

O exercício foi finalizado com sucesso. O menu foi reestruturado para apresentar os pratos de maneira interativa, utilizando o componente Card do reactstrap para a renderização dos pratos e permitindo a visualização de detalhes sobre a opção escolhida. Adicionalmente, reuni os dados dos pratos em um arquivo distinto (dishes.js), o que contribuiu para uma melhor organização do código.