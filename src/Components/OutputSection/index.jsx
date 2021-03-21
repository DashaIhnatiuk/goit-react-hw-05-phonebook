import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './OutputSection.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import slideTransition from '../Animations/slide.module.css';

class OutputSection extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired 
  };

  render() {
    const {data, onDelete} = this.props;
    const items = Object.values(data);
    return (
      <TransitionGroup component="ul">
          {items.map(item => (
            <CSSTransition key={item.id} timeout={250} classNames={slideTransition} unmountOnExit>
          <li 
            key={item.id}
    
          >
            {item.name} : {item.number}
            <button className={style.deleteBtn} onClick={() => {
                onDelete(item.id);
                }}>Delete</button>
          </li>
          </CSSTransition>
        ))}
       </TransitionGroup>
    );
  }
}

export default OutputSection;