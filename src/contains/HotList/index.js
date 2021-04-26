import React,{ Component } from 'react';
import styles from './hotlist.module.css';
import axios from 'axios';
import store from '../../Store/Store';

class HotList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.source = axios.CancelToken.source() //生成取消令牌用于组件卸载阻止axios请求
    }
    componentDidMount() {
        store.subscribe(() =>{
            this.setState(store.getState());
        });
        axios.get('http://localhost:3000/data/hots.json').then((response) => {
            let hotsAction = {
                type: 'get_hotUrl',
                hotList:response.data
            };
            store.dispatch(hotsAction);
        })
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
        // 阻止轻轻
        this.source.cancel("组件卸载，取消请求")
    }

    render() {
        const {hotList} = this.state;
        return (
            <div>
                <ul className={styles.hotListCon}>
                    {hotList && hotList.map((item, index) => {
                        return (
                        <li key={index}>
                            <img src={item.img} alt='hot'/>
                            <h4>{item.title}</h4>
                            <h5>{item.details}</h5>
                            <button>了解详情</button>
                        </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default HotList;