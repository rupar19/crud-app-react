import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "SIMPLE CRUD APPLICATION",
      index: " ",
      action: 0,
      datas: []
    }
    this.fSubmit = this.fSubmit.bind(this);
    this.fRemove = this.fRemove.bind(this);
    this.fEdit = this.fEdit.bind(this);
  }
  fSubmit(e) {
    e.preventDefault();
    //console.log("try");
    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;
    if (this.state.action === 0) { //new
      let data = { name, address };
      datas.push(data);
    }
    if (name === "" || address === "") {
      alert("Please enter the details");
    }
    else { //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
    }
    this.setState({
      datas: datas,
      action: 0
    })

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fRemove(i) {
    let datas = this.state.datas;
    datas.splice(i, 1);

    this.setState({
      datas: datas

    })
    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fEdit(i) {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.address.value = data.address

    this.setState({
      action: 1,
      index: i
    })

    this.refs.name.focus();

  }

  componentDidMount() {
    this.refs.name.focus();
  }


  render() {
    let datas = this.state.datas;

    return (
      <div className="app">
        <h2>{this.state.title} </h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="your name" className="formField" />
          <input type="text" ref="address" placeholder="your address" className="formField" />
          <button onClick={(e) => this.fSubmit(e)} className="myButton">Submit</button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i + 1}. {data.name}, {data.address}
              <button onClick={() => this.fEdit(i)} className="listButton"> Edit</button>
              <button onClick={() => this.fRemove(i)} className="listButton" > Remove</button>
            </li>
          )}
        </pre>
      </div>

    )
  }
}
