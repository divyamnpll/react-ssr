var createReactClass = require('create-react-class')
var DOM = require('react-dom-factories')
var div = DOM.div, button = DOM.button, ul = DOM.ul, li = DOM.li


module.exports = createReactClass({

  getInitialState: function() {
    return {items: this.props.items}
  },

  // Then we just update the state whenever its clicked by adding a new item to
  // the list - but you could imagine this being updated with the results of
  // AJAX calls, etc
  handleClick: function() {
    alert("div clicked");
  },


  render: function() {

    return div(null,

      div({onClick: this.handleClick}, 'Click here'),

      ul({children: (this.state.items || []).map(function(item) {
        return li(null, item)
      })})

    )
  },
})
