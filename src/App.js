import { Component } from 'react';
import Section from './Components/Section';
import AddSection from './Components/AddSection';
import OutputSection from './Components/OutputSection';
import Filter from './Components/Filter';
import Notification from './Components/Notification';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import './index.css';
import errorClass from './Components/Notification/Notification.module.css';
import titleTransition from './Components/Animations/title.module.css';
import popTransition from './Components/Animations/pop.module.css';
import notificationTransition from './Components/Animations/alert.module.css';

const INITIAL_STATE = {
  isVisible: false,
  message: "",
};

class App extends Component {
    state = {
        contacts: [],
        filter: '',
        ...INITIAL_STATE,
      };     

      componentDidMount() {
        const loadedContacts = JSON.parse(localStorage.getItem("contacts"));
        if (loadedContacts) this.setState({ contacts: loadedContacts });
      }
    
      componentDidUpdate(prevState) {
        const { contacts: currentContacts } = this.state;
        const { contacts: prevContacts } = prevState;
        if (currentContacts !== prevContacts) {
          localStorage.setItem("contacts", JSON.stringify(currentContacts));
        }
      }

    updateContactsList = () => {
        const {contacts, filter} = this.state;
        return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
    }

    handleDelete = value => {
        this.setState(prevState => {
            return {
              contacts: prevState.contacts.filter(({id}) => id !== value)
            }
          }) 
    }

    setMessage = (message) => {
      this.setState({ isVisible: true, message: message });
      setTimeout(() => {
        this.setState({
          ...INITIAL_STATE,
        });
      }, 1500);
    };

    handleFilterUpdate = value => {
        this.setState({ 
            filter: value
          });
          this.updateContactsList();   
    }

    handleButtonClick = (nameValue, numberValue) => {

        const contactState = this.state.contacts.find(contact => contact.name.toLowerCase() === nameValue.toLowerCase());

        if(contactState){
          this.setState({
            isVisible: true,
            message: "Contact already exists!",
          });
          setTimeout(() => {
            this.setState({
              ...INITIAL_STATE,
            });
          }, 1500);
        }

      //   contactState && this.setState({ errorMessage: 'Is already in contacts.' },  setTimeout(() => {
      //     this.setState({ errorMessage: '' });
      //   }, 1500));
      //  ;
        if (!contactState && nameValue && numberValue) {
            const newContact = {
                id: uuidv4(),
                name: nameValue,
                number: numberValue,
              };
              this.setState(prevState => {
                return {
                  contacts: [...prevState.contacts, newContact],
                }
              });
          
        }
    };

    render() {
        return (
            <div>
              <CSSTransition in timeout={500} classNames={titleTransition} appear>
          <h1 className="title">Phonebook</h1>
        </CSSTransition>
        <CSSTransition
          in={this.state.isVisible}
          timeout={250}
          classNames={notificationTransition}
          unmountOnExit
        >
          <Notification message={this.state.message} />
        </CSSTransition>
                    <AddSection onSendData={this.handleButtonClick}/>              
                    {this.state.contacts.length>0 && <h2>Contacts</h2>}
                    <CSSTransition in={this.state.contacts.length > 1}
          timeout={250}
          classNames={popTransition}
          unmountOnExit>
          <Filter onFilterUpdate={this.handleFilterUpdate}/>
        </CSSTransition>
                   
                   <OutputSection data={this.updateContactsList()} onDelete={this.handleDelete}/>

                  
            </div>
        );
    }
}
      

export default App;