var http = require('http')
var browserify = require('browserify')
var literalify = require('literalify')
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var DOM = require('react-dom-factories')
var body = DOM.body, div = DOM.div, script = DOM.script
var App = React.createFactory(require('./App'))

var BUNDLE = null


http.createServer(function(req, res) {

  if (req.url === '/') {

    res.setHeader('Content-Type', 'text/html; charset=utf-8')


    var props = {
      items: [
        'Item 0',
        'Item 1'
      ],
    }


    var html = ReactDOMServer.renderToStaticMarkup(body(null,


      div({
        id: 'content',
        dangerouslySetInnerHTML: {__html: ReactDOMServer.renderToString(App(props))},
      }),


      script({
        dangerouslySetInnerHTML: {__html: 'var APP_PROPS = ' + JSON.stringify(props) + ';'},
      }),


      script({src: 'https://cdn.jsdelivr.net/npm/react@16.3.1/umd/react.production.min.js'}),
      script({src: 'https://cdn.jsdelivr.net/npm/react-dom@16.3.1/umd/react-dom.production.min.js'}),
      script({src: 'https://cdn.jsdelivr.net/npm/react-dom-factories@1.0.2/index.min.js'}),
      script({src: 'https://cdn.jsdelivr.net/npm/create-react-class@15.6.3/create-react-class.min.js'}),


      script({src: '/bundle.js'})
    ))

    // Return the page to the browser
    res.end(html)

  } else if (req.url === '/bundle.js') {

    res.setHeader('Content-Type', 'text/javascript')


    if (BUNDLE != null) {
      return res.end(BUNDLE)
    }

    browserify()
      .add('./browser.js')
      .transform(literalify.configure({
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
        'react-dom-factories': 'window.ReactDOMFactories',
        'create-react-class': 'window.createReactClass',
      }))
      .bundle(function(err, buf) {
        // Now we can cache the result and serve this up each time
        BUNDLE = buf
        res.statusCode = err ? 500 : 200
        res.end(err ? err.message : BUNDLE)
      })

  // Return 404 for all other requests
  } else {
    res.statusCode = 404
    res.end()
  }

// The http server listens on port 3000
}).listen(3000, function(err) {
  if (err) throw err
  console.log('Listening on 3000...')
})
