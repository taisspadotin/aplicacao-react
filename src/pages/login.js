import React,{Component} from 'react';
import './style.scss';
//import api from '../../api';
import { realizaLogin } from "../services/auth";
import {Modal, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {GuardaDados} from '../actions';
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
		
		if(emailValue === ''){
			this.setState({tituloModal:'Erro', corpoModal:'Preencha o email', modal: true});
		}
		else if(senhaValue === ''){
			this.setState({tituloModal:'Erro', corpoModal:'Preencha a senha', modal: true});
		}
		else{
            
        	let dados = this.props.dados;
        	if(dados[0] !== undefined){
	        	if(dados[0].email === emailValue && dados[0].password === senhaValue){
					let token = this.random32bit();
					realizaLogin(token);
					window.location.href = '/aplicacao';
					
				}else{
					this.setState({tituloModal:'Erro', corpoModal:'Dados incorretos!', modal: true});
				}
			}
			else{
				this.setState({tituloModal:'Erro', corpoModal:'Dados incorretos!', modal: true});
			}
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
		const {emailValue, senhaValue} = this.state;

		return(
			<>
				<div className="login">
					<div className="login-1"></div>
					<div className="login-2">
						<div className="login-content" align="center">	
							<h1>LOGIN</h1>
							<div className="form__group field"  style={{width: '80%'}}>
								<input className="form__field" placeholder="email" type="text" onChange={this.inputChange} name='emailValue' value={emailValue} required={true}/>
								<label htmlFor="emailValue" className="form__label">Email</label>
							</div>

							<div className="form__group field"  style={{width: '80%'}}>
								<input className="form__field" type="password" placeholder="Senha" onChange={this.inputChange} name="senhaValue" value={senhaValue} required={true}/>
								<label htmlFor="senhaValue" className="form__label">Senha</label>
							</div>

							<br/>
							<button className="btn-init" type="button" onClick={()=>this.login()}>ENTRAR</button>
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
  dados:    store.TableState.dados
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({GuardaDados}, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);