import React,{Component} from 'react';
import Header from '../components/header';
import {Row, Col, Modal, Button} from 'react-bootstrap';
import api from '../services/api';
import {Table, Message} from 'semantic-ui-react';

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
		idOriginal: '',
		imagens: []
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
		const {idValue, nameValue, idSelecionado} = this.state;
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
				let d = (resp.data);
				let registros = this.state.registros;
				
				registros.push(d);
				this.setState({registros});
				
				//let id_image = resp.data.id;
				let id_image = idValue;
				if(id_image>0 && id_image<101){
				const imgResp = await api.get(`/albums/1/photos?id=${id_image}`,{
						headers:{
							"Content-type": "application/json; charset=UTF-8"
						},
				});
				let imagens = this.state.imagens;
				imagens.push(imgResp.data[0]);
				this.setState({imagens});
				}

				this.setState({idValue: '', nameValue:'', idSelecionado:'', idOriginal:''});
			
		}

	}


	componentDidMount = async () => {
		
	}

	selecionaRegistro = (id, title, i, idOriginal) => {
		this.setState({idSelecionado: i});
		this.setState({idValue: id, nameValue: title, idOriginal:idOriginal});

	}

	alterar = async () => {
		const {idSelecionado, indice, nameValue, idValue, idOriginal} = this.state;
		if(idSelecionado === ''){
			this.setState({tituloModal:'Erro', corpoModal:'Selecione um registro!', modal: true});
		}
		else if(this.validar()){
			const resp = await api.put(`/posts/${idOriginal}`, JSON.stringify({
		      id: indice,
		      title: nameValue,
		      body: '',
		      userId: idValue
		    }),{
					headers: {
				      "Content-type": "application/json; charset=UTF-8"
				    }
				});
			
			let registros = this.state.registros;
			let id = resp.data.id;
			for(let i=0; i<registros.length; i++){
				if(id === registros[i].id){
					registros[i].title =  resp.data.title;
					registros[i].userId =  resp.data.userId;
				}
			}
			
			this.setState({registros});
			
		}
	}

	excluir = async () => {
		const {idSelecionado, idOriginal} = this.state;

		if(idSelecionado === ''){
			this.setState({tituloModal:'Erro', corpoModal:'Selecione um registro!', modal: true});
		}
		else{
			const resp = await api.delete(`/posts/${idOriginal}`);
			let registros = this.state.registros;
			this.state.registros.splice(idSelecionado, 1);
    		this.setState([...this.state.registros]);
			
			//const respImg = await api.delete(`/albums/1/photos/${idOriginal}`);
			let imagens = this.state.imagens;
			this.state.imagens.splice(idSelecionado, 1);
    		this.setState([...this.state.imagens]);
			
			this.setState({idSelecionado: '', idOriginal:'', nameValue: '', idValue:''});
				
		}
	}

	novo = () => {
		this.setState({idSelecionado: '', idValue: '', nameValue: ''});
	}

	render(){
		const {idValue, nameValue, registros, idSelecionado, imagens} = this.state;
		let dados = '';
		if(registros.length < 1){
			dados = <Message negative style={{textAlign:'center'}}>
				<Message.Header>Nenhum registro encontrado!</Message.Header>
				<p>Insira um novo registro</p>
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
		let img = '';
		if(imagens.length > 0){
			img = <div className="image">
					{imagens.map((row, i)=>
						<div className="pic"  key={i}>
							<img src={row.thumbnailUrl}/>
						</div>
					)}
					</div>; 
		}

		return(
				<div className="aplicacao">
				<Header/>
					<div className="conteudo">
						
						<Row>
							<Col>
								<div className="form__group field">
									<input type="text" className="form__field" placeholder="ID" ref={this.refId} name='idValue' onChange={this.inputChange} value={idValue} required={true}/>
									<label htmlFor="idValue" className="form__label">ID</label>
								</div>
							</Col>
							
							<Col>
								<div className="form__group field">
									<input type="text" className="form__field" placeholder="Título"ref={this.refName} name='nameValue' onChange={this.inputChange} value={nameValue} required={true}/>
									<label htmlFor="nameValue" className="form__label">Título</label>
								</div>
							</Col>
						</Row>
						<br/>
						<Row className="mt-4">
							<Col align="center">
								<button className="btn" onClick={()=>this.novo()}>Novo</button>
								<button className="btn" onClick={()=>this.salvar()} style={{background: idSelecionado !== '' && '#a8a4a3'}}>Salvar</button>
								<button className="btn" onClick={()=>this.alterar()} style={{background: idSelecionado === '' && '#a8a4a3'}}>Alterar</button>
								<button className="btn" onClick={()=>this.excluir()} style={{background: idSelecionado === '' && '#a8a4a3'}}>Excluir</button>
							</Col>
						</Row>
						<br/><br/>
						{dados}
						{img}
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
