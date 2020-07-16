import { CLICK_UPDATE_VALUE, CLICK_GUARDA_VALUE} from './actionTypes';

export const clickButton = value => ({
  type: CLICK_UPDATE_VALUE,
  newValue: value
});

export const showTable = value =>({
	type: CLICK_UPDATE_VALUE,
	showTb: value
})
export const GuardaDados = value =>({
	type: CLICK_GUARDA_VALUE,
	dados: value
})