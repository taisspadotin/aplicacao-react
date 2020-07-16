import React,{Component} from 'react';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import Login from '../pages/login';
import Cadastro from '../pages/cadastro';
import Aplicacao from '../pages/aplicacao';
import { isAuthenticated } from "../services/auth";


class Main extends Component{
	render(){
		let rotasPrivada = '';
		if(isAuthenticated()){
			rotasPrivada = 
			<>
				<Route path="/aplicacao" component={Aplicacao} />
		</>;
		}else{
			rotasPrivada = <Redirect to="/"/>;
		}
		
		return(
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Login}/>
				<Route path="/cadastro" component={Cadastro} />
				{rotasPrivada}
				<Route path="*" component={() => <h1>Page not found</h1>} />
			</Switch>
		</BrowserRouter>
	)
	}
}
export default Main;