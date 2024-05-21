import _ from 'lodash';
import "./style.scss";

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

 document.body.appendChild(component());
 console.log('awawawaw!');

 if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}