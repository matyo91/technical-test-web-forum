'use strict';

const e = React.createElement;

class Thread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        comments: []
    };
  }

  render() {
    return (
        <>
            {this.props.page && (
                <form>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Example textarea</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            )}
        </>
    );
  }
}

const threadContainer = document.querySelector('#thread');
if(threadContainer) {
    ReactDOM.render(e(Thread, {page: threadContainer.getAttribute('data-page')}), threadContainer);
}