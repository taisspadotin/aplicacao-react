import React ,{ Component} from 'react';
import './style.scss';
import {Navbar, Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from "../services/auth";
import {Route} from 'react-router-dom';

class Header extends Component{
	state = {}
	sair = () =>{
		logout();
		return <Route patch="/login"/>;
	}

   
	render(){
		return(
		<>
		<Navbar collapseOnSelect expand="lg" style={{background: this.props.fundo}} className="navegacao">
		  <LinkContainer to="/"><Navbar.Brand><i className="paper plane icon" ></i></Navbar.Brand></LinkContainer>
		  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  <Navbar.Collapse  id="responsive-navbar-nav" className="conteudo-nav">
			<Nav  className="mr-auto">
			  <LinkContainer to="/cadastro"><Nav.Link>Cadastro</Nav.Link></LinkContainer>
			  {/*<LinkContainer to="/login"><Nav.Link>Entrar</Nav.Link></LinkContainer>*/}
			  <LinkContainer to="/login"><button className="btn-sair" onClick={()=>this.sair()}>Sair</button></LinkContainer>
			</Nav>
		  </Navbar.Collapse>
		</Navbar>
  
  </>
		)
	}
}
export default Header;