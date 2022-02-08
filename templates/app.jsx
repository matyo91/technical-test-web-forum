'use strict';

const e = React.createElement;

class Thread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        postError: false,
        comments: []
    };
  }

  componentDidMount() {
      this.loadComments()
  }

  onSubmit(event) {
    var self = this
    this.setState({'postError': false})
    event.preventDefault()

    var data = new FormData(event.target);
    var params = {
        content: data.get('content'),
        page: this.props.page
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '{{ path("comment_new") }}', true);
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.onload = function() {
        var jsonResponse = JSON.parse(xhr.responseText);
        self.setState({'postError': jsonResponse.status !== true})
        self.loadComments()
    }
    xhr.send(JSON.stringify(params))
  }

  loadComments() {
    var self = this
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `/comment/list${this.props.page ? '/' + this.props.page : ''}`, true);
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.onload = function() {
        var jsonResponse = JSON.parse(xhr.responseText);
        var comments = []
        for(var i = 0; i < jsonResponse.length; i++) {
            comments.push(jsonResponse[i])
        }

        self.setState({comments: comments})
    }
    xhr.send()
  }

  render() {
    return (
        <>
            {this.state.postError && (
                <div class="alert alert-danger" role="alert">
                    L'envoie du commentaire est invalide
                </div>
            )}
            {this.props.page && (
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="thread-comment">Ecrire un nouveau commentaire</label>
                        <textarea className="form-control" id="thread-comment" name="content" rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Envoyer</button>
                </form>
            )}
            <ul className="list-group">
            {this.state.comments.map(function(comment) {
                return (
                    <li key={comment.id} className="list-group-item">Le {comment.createDate} : {comment.content}</li>
                )
            })}
            </ul>
        </>
    );
  }
}

const threadContainer = document.querySelector('#thread');
if(threadContainer) {
    ReactDOM.render(e(Thread, {page: threadContainer.getAttribute('data-page')}), threadContainer);
}