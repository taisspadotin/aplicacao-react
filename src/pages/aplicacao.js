import React,{Component} from 'react';
import Header from '../components/header';
import {Row, Col, Modal, Button} from 'react-bootstrap';
import api from '../services/api';

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
		corpoModal: ''
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

	salvar = async() => {
		const {idValue, nameValue} = this.state;
		if(this.validar()){
			/*fetch('https://jsonplaceholder.typicode.com/posts', {
		    method: 'POST',
		    body: JSON.stringify({
		      title: nameValue,
		      body: 'bar',
		      userId: idValue
		    }),
		    headers: {
		      "Content-type": "application/json; charset=UTF-8"
		    }
		  })
		  .then(response => response.json())
		  .then(json => console.log(json))*/
		  const resp = await api.post(`/posts`, JSON.stringify({
		      title: nameValue,
		      body: 'bar',
		      userId: idValue
		    }),{
					headers:{
						"Content-type": "application/json; charset=UTF-8"
					},
				});
		console.log(resp);
		}

	}


	componentDidMount = async() => {
		/*fetch('https://jsonplaceholder.typicode.com/posts')
	  .then((response) => response.json())
	  .then((json) => console.log(json))*/
	  const resp = await api.get(`/posts`);
	  console.log(resp);
	}

	render(){
		const {idValue, nameValue} = this.state;
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
								<button className="btn" onClick={()=>this.salvar()}>Salvar</button>
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