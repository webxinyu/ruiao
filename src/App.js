import './App.css';
import React,{ Component }from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Top from "./contains/Top";
import Navs from "./contains/Navs";
import Home from "./contains/Home";
import Product from "./contains/Product";
import News from "./contains/News";
import About from "./contains/About";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }



  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <Top />
                <div style={{background:"#fff",width:"100%"}}>
                    <Navs />
                </div>
                <Switch>
                    <Route path="/product" component={ Product } />
                    <Route path="/news" component={ News } />
                    <Route path="/about" component={ About } />
                    <Route path="/" component={ Home }/>
                </Switch>
            </div>
        </BrowserRouter>
    );
  }

}

export default App;
