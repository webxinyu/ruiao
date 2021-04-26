import React,{ Component } from 'react';
import Banner from "../../component/Banner";
import store from "../../Store/Store";
import styles from './home.module.css';
import Hots from "../Hots";
import ProductList from "../ProductList";
import ProductRotation from "../Productrotation";
import ThreeHot from "../ThreeHot";
import Cooperation from "../Cooperation";
import HomeNews from "../HomeNews";
import HomeAbout from "../HomeAbout";
import Footer from "../Footer";
import Copyright from "../Copyright";
import axios from "axios";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.baCon = React.createRef();
        this.source = axios.CancelToken.source() //生成取消令牌用于组件卸载阻止axios请求
    }

    componentDidMount() {
        store.subscribe(() => {
            this.setState(store.getState())
        });
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
        // 阻止轻轻
        this.source.cancel("组件卸载，取消请求")
    }



    render() {
        const {imgUrl} = this.state;
        return (
            <div>
                <div style={{width: '100%', height: '585px',overflow: 'hidden'}}>
                    <div className={styles.home}>
                        {/* banner */}
                        <div ref={this.baCon} className={styles.banner}>
                            <Banner bannerUrl={imgUrl} />
                        </div>
                    </div>
                </div>
                {/* 热门产品 */}
                <Hots />
                {/* 产品列表 */}
                <div style={{overflow: 'hidden',width: '1200px',margin: '0 auto',marginTop: '71px'}}>
                    {/* 产品标题列表 */}
                    <div className={styles.productCon}>
                        <ProductList />
                    </div>
                    {/* 产品列表简介 */}
                    <div style={{float: "right"}}>
                        {/*  产品简介  */}
                        <div style={{width: '913px',height: '330px',background: '#fff'}}>
                            <ProductRotation />
                        </div>
                        {/*  产品top3  */}
                        <div style={{width: '913px',height: '180px',marginTop: '20px',background: '#fff'}}>
                            <ThreeHot />
                        </div>
                    </div>
                </div>
                {/* 合作咨询 */}
                <div style={{width: '100%',marginTop: '50px'}}>
                    <Cooperation />
                </div>
                {/* 新闻和关于我们 */}
                <div style={{width: '1200px',margin:"0 auto",background:"#fff",overflow: "hidden",marginTop:"30px"}}>
                    {/* 新闻 */}
                    <div style={{width:"782px",float: "left"}}>
                        <HomeNews />
                    </div>
                    {/* 关于我们 */}
                    <div style={{width:"390px",float: "right"}}>
                        <HomeAbout />
                    </div>
                </div>
                {/* 底部导航 */}
                <div style={{width:"100%",backgroundColor:"#404040"}}>
                    <Footer />
                </div>
                {/* 版权栏 */}
                <div style={{width:"100%",backgroundColor:"#0c4da2"}}>
                    <Copyright />
                </div>
            </div>
        )
    }
}

export default Home;