import React,{ Component } from 'react';
import axios from "axios";
import store from "../../Store/Store";

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }


    componentDidMount() {

        axios.get('http://localhost:3000/data/banner.json').then((response) => {
            store.dispatch({
                type: 'banner_list',
                imgUrl:response.data.banners
            })
        });
    }

    render() {

        return (
            <div>
                <ul>
                    {this.props.bannerUrl.map((item,index) => {
                        return <li style={{float: 'left'}} key={index}><img alt={item.index} src={item} /></li>
                    })}
                </ul>
            </div>
        )
    }
}

export default Banner;