import { CLICK_UPDATE_VALUE, CLICK_GUARDA_VALUE} from '../actions/actionTypes';


const estadoInicial = {
	showTb: false,
	dados: []
};

export const mostraTable = (state = estadoInicial, action)=>{
	switch(action.type){
	  case CLICK_UPDATE_VALUE:
      return {
        ...state,
        showTb: action.showTb
      };
	  case CLICK_GUARDA_VALUE:
		  return {
			...state,
			dados: action.dados
		  };
    default:
      return state;
	}
}



