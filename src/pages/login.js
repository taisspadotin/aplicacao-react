import React,{Component} from 'react';
import './style.scss';
//import api from '../../api';
import { realizaLogin } from "../services/auth";
import {Modal, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton, showTable, GuardaDados} from '../actions';
import {Redirect} from 'react-router-dom';

class Login extends Component{
	state = {
		emailValue: '',
		senhaValue: '',
		modal: false,
		tituloModal: '',
		corpoModal: '',
		redir: ''
	};

	random32bit = () => {
	  let u = new Uint32Array(1);
	  window.crypto.getRandomValues(u);
	  let str = u[0].toString(16).toUpperCase();
	  return '00000000'.slice(str.length) + str;
	}

	login = () =>{
		const {emailValue, senhaValue} = this.state;

		const enviar = {
			email: this.state.emailValue,
			senha: this.state.senhaValue
		};
		
		if(emailValue === ''){
			this.setState({tituloModal:'Erro', corpoModal:'Preencha o email', modal: true});
		}
		else if(senhaValue === ''){
			this.setState({tituloModal:'Erro', corpoModal:'Preencha a senha', modal: true});
		}
		else{
            
        	let dados = this.props.dados;
        	if(dados[0].email === emailValue && dados[0].password === senhaValue){
				let token = this.random32bit();
				realizaLogin(token);
				let redir = <Redirect to="/aplicacao"/>
				this.setState({redir});
			}
			/*fetch('https://api-cadastro-cliente.000webhostapp.com/usuarios?login=1', {
				method: 'POST',
				body: raw,
			})
			.then((response)=>{return response.text()})
			.then((data)=>{
				//console.log(data);
				//console.log(data.mensagem);
				let resp = JSON.parse(data);
				if(resp.codigo === 1){
				this.setState({tituloModal:'Erro', corpoModal:resp.mensagem, modal: true});
				 realizaLogin(resp.token);
				 window.location.href = "/";
				 }
				else{
					 this.setState({tituloModal:'Erro', corpoModal:resp.mensagem, modal: true});
				 }
			});
        */
		}
		
	}
	inputChange = event => {
	 const nome = event.target.name;
     this.setState({
       [nome]: event.target.value
     })
    } 

    handleClose = () => {
		this.setState({modal: false});
	}

	render(){
		const {emailValue, senhaValue, redir} = this.state;
		return(
			<>
			{redir}
				<div className="login">
					<div className="login-1"></div>
					<div className="login-2">
						<div className="login-content" align="center">	
							<h1>LOGIN</h1>
							<input className="input-login" type="text" onChange={this.inputChange} name='emailValue' value={emailValue} placeholder="Email"/>
							<input className="input-login" type="password" placeholder="Senha" onChange={this.inputChange} name="senhaValue" value={senhaValue}/>
							<br/>
							<button className="botao-login" type="button" onClick={()=>this.login()}>ENTRAR</button>
							<br/>
							<p>É novo? <a href="/cadastro">cadastre-se </a></p>
							<br/>
						</div>	
						
					</div>
				</div>
				<Modal show={this.state.modal} onHide={()=>this.handleClose()}>
		        <Modal.Header closeButton>
		          <Modal.Title>{this.state.tituloModal}</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>{this.state.corpoModal}</Modal.Body>
		        <Modal.Footer>
		          <Button onClick={()=>this.handleClose()}>
		            Fechar
		          </Button>
		        </Modal.Footer>
		     </Modal>
			</>
		)
	}
}

const mapStateToProps = store => ({
  newValue: store.clickState.newValue,
  showTb:   store.TableState.showTb,
  dados:    store.TableState.dados
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickButton, showTable, GuardaDados}, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);