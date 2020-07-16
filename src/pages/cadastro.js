import React ,{ Component} from 'react';
import Header from '../components/header';
import {Row, Col, Modal, Button} from 'react-bootstrap';
import {Icon} from 'semantic-ui-react';
import {Link, Redirect} from 'react-router-dom';
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
		const {userValue, emailValue, passwordValue} = this.state;
		if(userValue === ''){
			this.setState({tituloModal:'Erro', corpoModal:'Preencha o usuário', modal: true});
			return false;
		}
		else if(emailValue === ''){
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
		const {userValue, emailValue, passwordValue} = this.state;
		if(this.validar()){
			let data = [];
			let info = {};

			info['user'] = userValue;
			info['email'] = emailValue;
			info['password'] = passwordValue;
			data.push(info);
			/*var joined = this.state.valores.concat(data);
			this.setState({valores: joined});*/
			
			var joined = this.props.dados.concat(data);
			this.props.GuardaDados(joined);
			
			//console.log(this.state.valores);
			this.props.showTable(true);
			//console.log(this.state.valores);
			//this.props.showTable(true);
			alert('teste');
			let rd = <Redirect to="/"/>;
			this.setState({rd});
		}
		
	}


	render(){
	const {userValue, emailValue, passwordValue} = this.state;
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
					<Row>
						<Col>
							<h1>Cadastre-se</h1>
						</Col>
					</Row>

					<Row>
						<Col>
							<label>Usuário</label>
							<input type="text" ref={this.refUser} name='userValue' onChange={this.inputChange} value={userValue}/>
						</Col>
						<Col>
							<label>Email</label>
							<input type="email" ref={this.refEmail} name='emailValue' onChange={this.inputChange} value={emailValue}/>
						</Col>
					</Row>

					<Row>
						<Col>
							<label>Senha</label>
							<div className="form-group">
								<input type={this.state.type} ref={this.refPassword} name='passwordValue' onChange={this.inputChange} value={passwordValue}/>
								 {icone}
							</div>
						</Col>
					</Row>

					<Row align="center" style={{marginTop: '50px'}}>
						<Col>
							<button className="btn" onClick={()=>this.salvar()}>
							Salvar
							</button>
							<Link to="/">teste</Link>
						</Col>
					</Row>

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

