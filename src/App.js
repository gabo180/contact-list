import React from 'react';
import './App.css';
import ContactTable from './components/ContactTable'
import ContactForm from './components/ContactForm'
import ContactModal from './components/ContactModal'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const SERVICE_URL = 'http://contactlist.us-east-1.elasticbeanstalk.com';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      showEditModal: false,
      contactData: [
        {
          'contactId': 1,
          'firstName': 'Fake',
          'lastName': 'Data',
          'company': 'Unknown Inc.',
          'phone': '000-0000',
          'email': 'fakedata@unknown.io'
        }
      ],
      newContactData: {
        firstName: '',
        lastName: '',
        company: '',
        phone: '',
        email: ''
      },
      editContactData: {
        'contactId': 42,
        'firstName': 'Zaphod',
        'lastName': 'Beeblebrox',
        'company': 'Heart of Gold',
        'phone': '000-0000',
        'email': 'prez@badnews.us'
      }
    }
  }

  handleAddFormChange = (event) => {
    // The event triggering this function should be an input's onChange event
    // We need to grab the input's name & value so we can associate it with the
    // newContactData within the App's state.

    let inputName = event.target.name;
    let inputValue = event.target.value;
    let contactInfo = this.state.newContactData;

    console.log(`Updating new contact data: ${inputName} : ${inputValue}`);

    if (contactInfo.hasOwnProperty(inputName)) {
      contactInfo[inputName] = inputValue;
      this.setState({ newContactData: contactInfo })
    }
  }

  handleAddFormSubmit = (event) => {
    console.log('Adding contact!')
    if (event) event.preventDefault();

    fetch(SERVICE_URL + '/contact/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(this.state.newContactData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Add Contact - Success:', data);
        this.setState({ newContactData: { firstName: '', lastName: '', company: '', phone: '', email: '' } })
        this.loadContactData();
      })
      .catch((error) => {
        console.log('Add Contact - Error:')
        console.log(error)
      });
}

  handleEditModalClose = (event) => {
    console.log('Closing Edit Modal')
    this.setState({ showEditModal: false })
  }

  handleEditModalOpen = (event) => {
    console.log('Opening Edit Modal')
    if (event) event.preventDefault();
    let contactId = event.target.value;
    console.log(`Editing contact id ${contactId}`)
    this.setState({ showEditModal: true})
  }

  loadContactData() {
    this.setState({ loading: true })
    console.log('Loading contact data')
    fetch(SERVICE_URL + '/contacts')
      .then(data => data.json())
      .then(data => this.setState(
        { contactData: data, loading: false }
      ))
  }

  componentDidMount() {
    console.log('App is now mounted.')
    // this.setState({ loading: true })
    // console.log('Loading contact data')
    // fetch(SERVICE_URL + '/contacts')
    //   .then(data => data.json())
    //   .then(data => this.setState(
    //     { contactData: data, loading: false },
    //   ))
    this.loadContactData();
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <h1 className="text-center">Contact Application</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm={8}>
            <h2>My Contacts</h2>
            <ContactTable
              contacts={this.state.contactData}
              handleEdit={this.handleEditModalOpen}
            />
          </Col>
          <Col sm={4}>
            <h2>Add New Contact</h2>
            <ContactForm
              handleSubmit={this.handleAddFormSubmit}
              handleChange={this.handleAddFormChange}
              contactData={this.state.newContactData}
            />
          </Col>
        </Row>
        <ContactModal
          show={this.state.showEditModal}
          handleClose={this.handleEditModalClose}
          contactData={this.state.editContactData} />
      </Container>
    );
  }
}

export default App;
