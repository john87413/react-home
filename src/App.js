import React from 'react';
import logo from './logo.svg';
import './App.scss';


// judge component
function ListItem(props) {
  let className = 'not-check';
  if (props.check) {
    className = ' is-check';
  }
  return <p className={className}>{props.value}</p>;
}

function NumberList(props) {
  const judgeList = props.judgeList;
  const judgeItems = judgeList.map((item) =>
    <ListItem key={item.text}
      value={item.text} check={item.judge} />
  );
  return (
    <ul>
      {judgeItems}
    </ul>
  );
}

const judgeList = [
  {
    text: "Cannot start or end with a space",
    judge: false,
  },
  {
    text: "include an lower case letter",
    judge: false
  },
  {
    text: "include an upper case letter",
    judge: false
  },
  {
    text: "include a number",
    judge: false
  },
  {
    text: "be 9-50 characters long",
    judge: false
  }];


// main page
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.myRe = [/^[^\s]*[^\s]$/, /[a-z]/, /[A-Z]/, /[0-9]/,/^.{9,50}$/];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // emit input
  handleChange(event) {
    for (let i = 0; i < this.myRe.length; i++) {
      if (this.judgePassword(this.myRe[i], event.target.value)) {
        judgeList[i].judge = true;
      }
      else {
        judgeList[i].judge = false;
      }
    }
    this.setState({ value: event.target.value });
  }

  // button submit
  handleSubmit(event) {
    let canGo = false;
    for(let i = 0; i < judgeList.length; i++){
      if(judgeList[i].judge){canGo = true;}
      else{canGo = false;break;}
    }
    if(canGo){
      alert('success');
    }
    else{
      alert('fail');
    }
    event.preventDefault();
  }

  // regular expression judge password
  judgePassword(pattern, text) {
    const regExp = new RegExp(pattern)
    return regExp.test(text)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Please Enter Your Password
        </p>
          <div className="password d-flex flex-column">
            <input
              className="my-1 bg-none fs-lg text-white py-1 px-2 text-top"
              placeholder="password"
              value={this.state.value}
              onChange={this.handleChange}
              type="password"
            />
            <div className="judge">
              <NumberList judgeList={judgeList} />
            </div>
            <button className="bt-back-1 bt-nav-1 ripple fs-md py-2 my-2 fw-bold" onClick={this.handleSubmit}>發送</button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
