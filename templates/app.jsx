'use strict';

const e = React.createElement;

class Thread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        postError: false,
        responseCommentId: null,
        comments: [],
        responseComments: {}
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

    if(data.get('responseComment')) {
        params['responseComment'] = data.get('responseComment')
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
        var responseComments = {}
        for(var i = 0; i < jsonResponse.length; i++) {
            var comment = jsonResponse[i]
            if(comment.responseComment) {
                responseComments[comment.responseComment] = responseComments[comment.responseComment] || []
                responseComments[comment.responseComment].push(comment)
            } else {
                comments.push(comment)
            }
        }

        self.setState({comments: comments, responseComments: responseComments})
    }
    xhr.send()
  }

  render() {
    var self = this
    return (
        <>
            {this.state.postError && (
                <div class="alert alert-danger" role="alert">
                    L'envoie du commentaire est invalide
                </div>
            )}
            {this.props.page && (
                <form onSubmit={this.onSubmit.bind(this)} className="pb-5">
                    <div className="form-group">
                        <label htmlFor="thread-comment">Ecrire un nouveau commentaire</label>
                        <textarea className="form-control" id="thread-comment" name="content" rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Envoyer</button>
                </form>
            )}

            <p>liste des commentaires</p>
            <ul className="list-group">
            {this.state.comments.map(function(comment) {
                return (
                    <li key={comment.id} className="list-group-item">Le {comment.createDate} : {comment.content}
                    {self.props.page && (<button type="button" className="btn btn-info float-end" onClick={function() {
                        self.setState({'responseCommentId': comment.id})
                    }}>Répondre</button>)}
                    
                    {self.state.responseCommentId === comment.id && (
                        <form onSubmit={self.onSubmit.bind(self)}>
                            <div className="form-group">
                                <label htmlFor="thread-response-comment">Répondre au commentaire</label>
                                <textarea className="form-control" id="thread-response-comment" name="content" rows="3"></textarea>
                            </div>
                            <input type="hidden" name="responseComment" value={comment.id} />
                            <button type="submit" className="btn btn-primary">Envoyer</button>
                        </form>
                    )}
                    {self.state.responseComments[comment.id] && (
                        <>
                            <p className="pt-5">Réponses au commentaire</p>
                            <ul>
                            {self.state.responseComments[comment.id].map(function(responseComment) {
                                return (
                                    <li key={responseComment.id} className="list-group-item">Le {responseComment.createDate} : {responseComment.content}</li>
                                )
                            })}
                            </ul>
                        </>
                    )}
                    </li>
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