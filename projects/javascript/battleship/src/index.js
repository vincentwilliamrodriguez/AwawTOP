import './style.scss';
import DisplayManager from './display.js';
import * as Helper from './helper.mjs';

window.globals = {};

const $ = document.querySelector.bind(document);

// $('.modal').close();

window.globals.Game = DisplayManager.Game;
window.globals.DisplayManager = DisplayManager;

DisplayManager.init();
// $('#isAI-1-false').click();
// $('.play-btn').click();

// $('.place--active .shuffle-btn').click();
// $('.place--active .place-btn').click();

// $('.place--active .shuffle-btn').click();
// $('.place--active .place-btn').click();

