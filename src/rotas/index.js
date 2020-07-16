import React,{Component} from 'react';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import Login from '../pages/login';
import Cadastro from '../pages/cadastro';
import Aplicacao from '../pages/aplicacao';
import { isAuthenticated } from "../services/auth";


/*const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Route path="/cadastro" component={Cadastro} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);
*/

class Main extends Component{
	render(){
		let rotasPrivada = '';
		if(isAuthenticated()){
			rotasPrivada = 
			<>
				{/*<Route exact path="/" component={Index} />*/}
				<Route path="/cadastro" component={Cadastro} />
				
			</>;
		}else{
			rotasPrivada = <Redirect to="/login"/>;
		}
		
		return(
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Login}/>
				<Route path="/aplicacao" component={Aplicacao} />
				{rotasPrivada}
				<Route path="*" component={() => <h1>Page not found</h1>} />
			</Switch>
		</BrowserRouter>
	)
	}
}
export default Main;