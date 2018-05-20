var React = require('react')
var ReactDOM = require('react-dom')
var App = React.createFactory(require('./App'))

ReactDOM.render(App(window.APP_PROPS), document.getElementById('content'))
