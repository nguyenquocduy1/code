import React from 'react';
import StyleEditor from './styleEditor';
import Heart from './heart';
import HeartRain from './heartRain';

const isPc = (function () {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}());

export default class App extends React.Component {

    fullStyle = [
        `/*
        * Hi. baby!
        * So long. I have n’t told my work yet!
        * I am a front -end engineer. Commonly known as programmers. Web -related.
        * Like this page. It is a webpage that has nothing.
        * My job is to add something to this blank page.
        * Um. Speaking of mobile phones and computers, you have to distinguish it.
* What you use now is。。。${isPc ? 'Computer': 'mobile phone'}
*/

/* Đầu tiên thêm hiệu ứng chuyển tiếp vào tất cả các yếu tố */
* {
  -webkit-transition: all .5s;
  transition: all .5s;
}
/*Bối cảnh trắng nhìn hơi đơn điệu. Quay trở lại nền */
body, html {
  color: #fff;
  background-color: darkslategray;
}

/* Văn bản quá gần nhìn xu quá */
.styleEditor {
  overflow: auto;
  ${ isPc ? `width: 48vw;
  height: 96vh;` : `width: 96vw;
  height: 48vh;` }
  border: 1px solid;
  font-size: 14px;
  line-height: 1.5;
  padding: 10px;
}

/* Những code màu này giống nhau. Thêm một chút nổi bật */
.token.selector{ color: rgb(133,153,0) }
.token.property{ color: rgb(187,137,0) }
.token.punctuation{ color: yellow }
.token.function{ color: rgb(42,161,152) }
.token.comment{ color: rgb(177,177,177) }

/* Thêm hiệu ứng 3D dô nè */
html{
  perspective: 1000px;
  -webkit-perspective: 1000px;
}

.styleEditor {
  ${ isPc ? `transform: rotateY(10deg) translateZ(-100px) ;
  -webkit-transform: rotateY(10deg) translateZ(-100px);` : `transform: rotateX(-10deg) translateZ(-100px);
  -webkit-transform: rotateX(-10deg) translateZ(-100px);` } ${ isPc ? '' : `
  transform-origin: 50% 0% 0;
  -webkit-transform-origin: 50% 0% 0;` }
}

/*
* Alo, để t giúp cậu biết về code ngay bây giờ。
* Vẽ một tình yêu với code nào。
*/

/* Đầu tiên, đây là một bảng hình ảnh nè */
.heartWrapper {
  ${ isPc ? `width: 48vw;
  height: 96vh;` : `width: 96vw;
  height: 48vh;`}
  position: relative;
  border: 1px solid;
  background-color: white;
  ${ isPc ?
  `transform: rotateY(-10deg) translateZ(-100px);
  -webkit-transform: rotateY(-10deg) translateZ(-100px);` :
  `transform: rotateX(10deg) translateZ(-100px);
  -webkit-transform: rotateX(10deg) translateZ(-100px);`}${ isPc ? '' :`
  transform-origin: 50% 0% 0;
  -webkit-transform-origin: 50% 0% 0;`}
}

/* Vẽ một khối, bên trái và bên phải */
.heart {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
  border-radius: 20px;
  background: #E88D8D;
  transform: rotate(45deg);
}

/* Vẽ ở giữ nè */
.heart::before {
  content: '';
  background: #E88D8D;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  left: -38px;
  top: 1px;
}

/* Vẽ bên phải tiếp nè */
.heart::after {
  content: '';
  background: #E88D8D;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  right: -1px;
  top: -38px;
}

/* Nhìn đơn giản nhể, hay là để trái tim đập lên xíu nào */
@keyframes throb {
  0% {
    transform: scale(1) rotate(45deg);
    opacity: 1;
  }

  100% {
    transform: scale(1.65) rotate(45deg);
    opacity: 0
  }
}

.bounce {
  opacity: 0.2;
  animation: throb 1s infinite linear;
}
/*
* Ok，Xong rồi đó！
* Baby, mãi yêu！
*/

`
    ]

    state = {
        currentStyleCode: '',
        finished: false,
        heartRains: []
    }

    interval = 30;
    // interval = 0;

    async progressiveShowStyle(n = 0) {
        const {
            interval,
            fullStyle
        } = this;
        const showStyle = i => new Promise((resolve) => {
            const style = fullStyle[n];
            const char = style[i];
            if (!style || !char) {
                resolve();
                return;
            }
            let {
                currentStyleCode
            } = this.state;
            currentStyleCode += char;
            this.setState({
                currentStyleCode
            });
            if (char === '\n' && this.styleEditor) {
                this.styleEditor.toBottom();
            }
            setTimeout(() => {
                resolve(showStyle(i + 1))
            }, interval);
        });
        return showStyle(0);
    }

    async componentDidMount() {
        await this.progressiveShowStyle(0);
        this.setState({finished: true});
        this.rain();
    }

    saveStyleEditorRef = child => this.styleEditor = child;
    
    rain = () => {
        let { heartRains } = this.state;
        const rainNum = 30;
        const stayTime = rainNum * 200 + 1000 + 4000;
        const time = (new Date()).getTime();
        if (!heartRains.length || (time - heartRains[heartRains.length - 1].time > (stayTime / 2))) {
            heartRains.push({time, rainNum});
            this.setState({heartRains});
            setTimeout(() => {
                this.removeRain(time);
            }, stayTime);
        }
    }

    removeRain(time) {
        let { heartRains } = this.state;
        heartRains = heartRains.filter(item => item.time !== time);
        this.setState({heartRains});
    }

    render() {
        const { currentStyleCode, finished, heartRains } = this.state;
        return <div>
            <div style = {{display: isPc ? 'flex' : ''}}>
                <StyleEditor ref={this.saveStyleEditorRef} code={currentStyleCode}/>
                <Heart click={finished ? this.rain: null}/>
            </div>
            {
                heartRains.map(item => <HeartRain num={item.rainNum} key={item.time}/>)
            }
        </div>;
    }
}