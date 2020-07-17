import React ,{ Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {Icon} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton, showTable, GuardaDados} from '../actions';

class Cadastro extends Component{
	constructor(props){
		super(props);
		
		//refs
		this.refUser  = React.createRef();
		this.refEmail  = React.createRef();
		this.refPassword  = React.createRef();
	}
	state = {
		userValue: '',
		passwordValue: '',
		emailValue: '',
		type: "password",
		modal: false,
		tituloModal: '',
		corpoModal: '',
		reload: false,
		redir: 0,
		rd: ''
	};
	
	inputChange = event => {
	 const nome = event.target.name;
     this.setState({
       [nome]: event.target.value
     })
    } 

    visualizarSenha = () =>{
		this.setState({type: 'text'});
	}
	esconderSenha = () =>{
		this.setState({type: 'password'});
	}

	handleClose = () => {
		this.setState({modal: false});
		if(this.state.reload === true){
			document.location.reload();
		}
	}

	validar = ()  => {
		const {emailValue, passwordValue} = this.state;
		if(emailValue === ''){
			this.setState({tituloModal:'Erro', corpoModal:'Preencha o email', modal: true});
			return false;
		}
		else if(passwordValue === ''){
			this.setState({tituloModal:'Erro', corpoModal:'Preencha a senha', modal: true});
			return false;
		}
		else{
			return true;
		}
	}

	salvar = () => {
		const {emailValue, passwordValue} = this.state;
		if(this.validar()){
			let data = [];
			let info = {};

			info['email'] = emailValue;
			info['password'] = passwordValue;
			data.push(info);
			
			var joined = this.props.dados.concat(data);
			this.props.GuardaDados(joined);
			
			this.props.showTable(true);
			
			let rd = <Redirect to="/"/>;
			this.setState({rd});
		}
		
	}


	render(){
	const {emailValue, passwordValue} = this.state;
	let icone = '';
    if(this.state.type === "password")
    {
    	icone = <span onClick={()=>this.visualizarSenha()}><Icon name="eye"/></span>;
    }
    else{
    	icone = <span onClick={()=>this.esconderSenha()}><Icon name="eye slash"/></span>;	
    }

		return(
			<div className="cadastro">
			{this.state.rd}
			<br/>
				<div className="conteudo">
					<div className="conteudo-1"></div>
					<div className="conteudo-2">
						<div className="cadastro-content" align="center">	
						
							<h1>Cadastre-se</h1>
						
							<div className="form__group field"  style={{width: '80%'}}>
								<input type="email" className="form__field" placeholder="email" ref={this.refEmail} name='emailValue' onChange={this.inputChange} value={emailValue} required={true}/>
								<label htmlFor="emailValue" className="form__label">Email</label>
							</div>

							<div className="form__group field"  style={{width: '80%'}}>
								<input className="form__field" placeholder="senha"type={this.state.type} ref={this.refPassword} name='passwordValue' onChange={this.inputChange} value={passwordValue} required={true}/>
								<label htmlFor="passwordValue" className="form__label">Senha</label>
								{icone}
							</div>
						
							<br/><br/>
							<button className="btn-init" onClick={()=>this.salvar()}>Salvar</button>
						
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
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cadastro);
//export default Cadastro;

