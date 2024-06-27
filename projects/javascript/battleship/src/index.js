
import './style.scss';
import DisplayManager from './display.js'
import * as Helper from './helper.mjs';

window.globals = {};
window.globals.Game = DisplayManager.Game
window.globals.DisplayManager = DisplayManager

DisplayManager.printBoardStates()