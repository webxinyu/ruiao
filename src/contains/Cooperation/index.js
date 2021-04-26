import React,{ Component } from 'react';
import axios from 'axios';
import styles from './cooperation.module.css';

import store from '../../Store/Store';

class Cooperation extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }

    componentDidMount() {
        axios.get('http://localhost:3000/data/cooperation.json').then((response) => {
            const cooperationData = {
                type: 'GET_COOPERATION',
                cooperation: response.data
            };
            store.dispatch(cooperationData);
        })
    }

    render() {
        const { cooperation} = this.state;
        return (
            <div style={{paddingTop: "18px",width: "100%",backgroundImage: "url("+(cooperation && cooperation.bg)+")",backgroundPosition:"center 18px",backgroundColor:"#fff",backgroundRepeat: "no-repeat",height: "220px"}}>
                <div style={{width: "1200px",margin:"0 auto",position:"relative",color:"#fff"}}>
                    <div className={styles.imgCon}>
                        <img alt="images" src={cooperation && cooperation.img} />
                    </div>
                    <div className={styles.content}>
                        <h2>{cooperation && cooperation.title}</h2>
                        <ul>
                            {(cooperation && cooperation.purposeList.length > 0) && cooperation.purposeList.map((item, index) => {
                                return (
                                    <li key={"AIM"+index} style={{backgroundImage: "url("+(cooperation && cooperation.tick)+")",backgroundPosition:"left 0",backgroundRepeat: "no-repeat"}}>{item}</li>
                                )
                            })}

                        </ul>
                        <h3>咨询热线：{ cooperation && cooperation.telNumber}</h3>
                        <button>在线客服</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cooperation;