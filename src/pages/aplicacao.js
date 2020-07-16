import React,{Component} from 'react';
import Header from '../components/header';
import {Row, Col, Modal, Button} from 'react-bootstrap';
import api from '../services/api';
import {Table, Pagination, Message} from 'semantic-ui-react';

export default class Aplicacao extends Component{
	constructor(props){
		super(props);
		
		//refs
		this.refId  = React.createRef();
		this.refName  = React.createRef();
	}
	state = {
		idValue: '',
		nameValue: '',
		modal: false,
		tituloModal: '',
		corpoModal: '',
		registros: [],
		idSelecionado: '',
		indice: ''
	};
	
	inputChange = event => {
	 const nome = event.target.name;
     this.setState({
       [nome]: event.target.value
     })
    } 

    handleClose = () => {
		this.setState({modal: false});
		if(this.state.reload === true){
			document.location.reload();
		}
	}

	validar = () => {
		const {idValue, nameValue} = this.state;
		if(idValue === ''){
			this.setState({tituloModal:'Erro', corpoModal:'Preencha o ID', modal: true});
			this.refId.current.focus();
			return false;
		}
		else if(nameValue === ''){
			this.setState({tituloModal:'Erro', corpoModal:'Preencha o Título', modal: true});
			this.refName.current.focus();
			return false;
		}
		else{
			return true;
		}
	}

	salvar = async () => {
		const {idValue, nameValue, idSelecionado, indice} = this.state;
		if(idSelecionado !== ''){
			this.setState({tituloModal:'Erro', corpoModal:'Esse registro já existe!', modal: true});
		}
		else if(this.validar()){
				const resp = await api.post(`/posts`, JSON.stringify({
			      title: nameValue,
			      body: 'bar',
			      userId: idValue
			    }),{
						headers:{
							"Content-type": "application/json; charset=UTF-8"
						},
						});
				//console.log(resp.data);
				let d = (resp.data);
				let registros = this.state.registros;
				let j = (registros.length)
				const id = {'indice': j};
				d = Object.assign(d, id);
				//console.log(d);
				
				
				
				registros.push(d);
				this.setState({registros});
				this.setState({idValue: '', nameValue:'', idSelecionado:''});
			
		}

	}


	componentDidMount = async () => {
		
	}

	selecionaRegistro = (id, title, i, indice) => {
		this.setState({idSelecionado: i});
		this.setState({idValue: id, nameValue: title, indice: i});//como a api simula ate 100 pegamos o contador mais um

	}

	alterar = async () => {
		const {idSelecionado, indice, nameValue, idValue} = this.state;
		//console.log(idSelecionado);
		if(idSelecionado === ''){
			this.setState({tituloModal:'Erro', corpoModal:'Selecione um registro!', modal: true});
		}
		else if(this.validar()){
			const resp = await api.put(`/posts/${indice+1}`, JSON.stringify({
		      id: indice,
		      title: nameValue,
		      body: 'bar',
		      userId: idValue
		    }),{
					headers: {
				      "Content-type": "application/json; charset=UTF-8"
				    }
				});
			
			let registros = this.state.registros;
			
			/*registros.forEach(item => {
			  //if(item.id)
			  item.name = "Marketplace";
			});*/
			
			this.setState({registros});
			//this.setState({});

		}
	}

	excluir = () => {
		const {idSelecionado} = this.state;
		if(idSelecionado === ''){
			this.setState({tituloModal:'Erro', corpoModal:'Selecione um registro!', modal: true});
		}
		else{
			
		}
	}

	novo = () => {
		this.setState({idSelecionado: '', idValue: '', nameValue: ''});
	}

	render(){
		const {idValue, nameValue, registros} = this.state;
		let dados = '';
		//console.log(registros.length);
		if(registros.length < 1){
			dados = <Message negative style={{textAlign:'center'}}>
				<Message.Header>Nenhum registro encontrado!</Message.Header>
				<p>Verifique sua conexão com o banco</p>
			</Message>;
		}
		else{
			dados = <div>
				<Table celled fixed singleLine className="tabela">
					<Table.Header>
					  <Table.Row>
						<Table.HeaderCell>ID</Table.HeaderCell>
						<Table.HeaderCell>Título</Table.HeaderCell>
					  </Table.Row>
					</Table.Header>
				<Table.Body>
					{registros.map((row, i)=>
					  <Table.Row key={i} onClick={()=>this.selecionaRegistro(row.userId, row.title, i, row.id)} style={{background: i === this.state.idSelecionado && '#76002c40'}}>
						<Table.Cell>{row.userId}</Table.Cell>
						<Table.Cell>{row.title}</Table.Cell>
					  </Table.Row>
					)}
				</Table.Body>
			  </Table>
			  <br/>
				
			  			  
			</div>;
		}
		return(
				<div className="aplicacao">
				<Header/>
					<div className="conteudo">
						<Row>
							<Col>
								<label>ID:</label>		
								<input type="text" ref={this.refId} name='idValue' onChange={this.inputChange} value={idValue}/>
							</Col>
							<Col>
								<label>Título:</label>		
								<input type="text" ref={this.refName} name='nameValue' onChange={this.inputChange} value={nameValue}/>
							</Col>
						</Row>
						<br/>
						<Row>
							<Col align="center">
								<button className="btn" onClick={()=>this.novo()}>Novo</button>
								<button className="btn" onClick={()=>this.salvar()}>Salvar</button>
								<button className="btn" onClick={()=>this.alterar()}>Alterar</button>
								<button className="btn" onClick={()=>this.excluir()}>Excluir</button>
							</Col>
						</Row>
						<br/>
						{dados}
						
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