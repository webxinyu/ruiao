import React,{ Component } from 'react';
import axios from 'axios';
import store from '../../Store/Store';

import styles from './threeHot.module.css';

class ThreeHot extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.source = axios.CancelToken.source() //生成取消令牌用于组件卸载阻止axios请求
    }

    componentDidMount() {
        store.subscribe((() => {
            this.setState(store.getState());
        }));
        axios.get('http://localhost:3000/data/threeHot.json').then((response) => {
            const threeHotData = {
                type:"GET_ThreeHot",
                threeHot:response.data
            };
            store.dispatch(threeHotData);
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
        const { threeHot } = this.state;

        return (
            <div>
                <ul className={styles.container}>
                    {threeHot && threeHot.map((item,index) => {
                       return (
                           <li key={"threeHot"+ index}>
                               <article>
                                   <img alt={"hotImg" + index} src={item.img} />
                               </article>
                               <h3>
                                   {item.title}
                                   <img alt="arrow" src={item.icon} />
                               </h3>
                           </li>
                       )
                    })}
                </ul>
            </div>
        )

    }
}

export default ThreeHot;