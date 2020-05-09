import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Card, CardImg, CardText, CardBody, Label, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

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
    console.log("Current state is: " + JSON.stringify(values));
    alert("Current state is: " + JSON.stringify(values));
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
                <div>
                <Control.select model=".rating" type="select" id="rating" name="rating">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
                </div>
              </div>

              <div className="form-group">
                <Label htmlFor="author">Your Name</Label>
                <div>
                <Control.text model=".author" type="text" id="author" name="author" validators={{
                  minLength: minLength(2),
                  maxLength: maxLength(15)
                }}>
                </Control.text>
                </div>
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
                <div>
                <Control.text model=".text" type="text" id="text" name="text">
                </Control.text>
                </div>
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

function RenderComments({ comments }) {
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
        <CommentForm />
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
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>)
};

function CampsiteInfo(props) {
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
          <RenderComments comments={props.comments} />
        </div>
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



