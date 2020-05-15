import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Card, CardImg, CardText, CardBody, Label, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: '',
      author: '',
      text: '',
      isModalOpen: false,
      touched: {
        rating: false,
        author: false,
        text: false
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <i className=" fa fa-pencil" /> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select model=".rating" type="select" id="rating" name="rating" className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>

              <div className="form-group">
                <Label htmlFor="author">Your Name</Label>
                <Control.text model=".author" type="text" id="author" name="author" className="form-control" validators={{
                  minLength: minLength(2),
                  maxLength: maxLength(15)
                }}>
                </Control.text>
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    required: 'Required',
                    minLength: 'Must be at least 2 characters',
                    maxLength: 'Must be 15 characters or less'
                  }}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="text">Comment</Label>
                <Control.text model=".text" type="text" id="text" name="text" component="textarea" className="form-control">
                </Control.text>
              </div>
              <Button color="primary" type="submit">Do it!</Button>{' '}
              <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

function RenderComments({ comments, postComment, campsiteId }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments:</h4>
        {comments.map(comment => <div key={comment.id}>{comment.text}
          <div>
            --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
          </div><br></br>
        </div>
        )
        }
        <CommentForm campsiteId={campsiteId} postComment={postComment} />

      </div>
    )
  };
  return (
    <div>

    </div>
  )
};

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>)
};

function CampsiteInfo(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            campsiteId={props.campsite.id}
          />        </div>
      </div>
    );
  } else {
    return (
      <div>

      </div>
    )
  }

}


export default CampsiteInfo;



