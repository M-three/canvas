// Object.defineProperty(claw, "yy", {
//     set: function (val) {
//         this.y += val;
//         this.draw()
//
//     }
// });
//
// Object.defineProperty(claw, "xx", {
//     set: function (val) {
//         this.x = val;
//         this.draw()
//
//     }
// });


var W = 480;                //canvas的宽度
var H = 600;               //canvas的高度
var difficulty =200;    //值越大 东西越少
var canvas = document.getElementById('can');
canvas.width = W;
canvas.height = H;
var ctx = canvas.getContext('2d');


var clawSpeed = 30;
var boxList =[];
var boxSpeed =30;//盒子移动速度
var boxListMix = 3;//出现盒子的最大值
var canClick=true;
//-----------背景
var bgImage = new Image();
bgImage.src = "img/background.png";
bgImage.onload = function(){
    ctx.drawImage(bgImage,0,0);
};
//---------背景


//----------爪子
var clawImage = new Image();
clawImage.src = "img/claw.png";
var claw = new clawObject(clawImage);

clawImage.onload = function(){
    clawMove();//初始化
};



function clawMove() {
        if(claw.canMove){
            claw.clear();
            if(claw.x>=360||claw.x<=30){
                clawSpeed =-clawSpeed
            }
            claw.x = claw.x+clawSpeed;
            claw.draw();
            setTimeout(arguments.callee,200)
        }

}
function clawObject(imgs){
    this.width = 99;
    this.height = 794;
    this.x = 31;
    this.y = -600;
    this.canMove = true;
    this.draw = function(){
        ctx.drawImage(imgs,this.x,this.y);
    };
    this.clear =function () {
        ctx.clearRect(this.x,this.y,this.width,this.height)
    }


}

// //移动鼠标
// canvas.onmousemove = function(e){
//     if(claw.canMove){
//         var x = e.offsetX;
//         var y = e.offsetY;
//         claw.clear();
//         claw.x = x;
//         claw.draw();
//     }
// };

//点击鼠标
canvas.onclick = function(){
//爪子
    if (canClick){
        canClick =false;
        claw.canMove =false;
        function clawY(){
            claw.clear();
            claw.y = claw.y+20;
            claw.draw();
            if(claw.y<=-300){
                setTimeout(arguments.callee,200)
            }else{
                var _run =true;
                //到达目标位置  判断是否碰到了目标
                boxList.forEach(function (item, index, array) {
                    if((claw.x+claw.width)>=item.x&&claw.x<=(item.x+item.width)){
                        //碰到了
                        clearInterval(time);//停止动画
                        alert('抓到了');
                        _run =false
                    }
                });
                if(_run){
                    console.log('没抓到')
                    clawReturn();
                }



            }
        }
        clawY()
    }

};

function clawReturn(){
    var _n= ()=> {
        claw.clear();
        claw.y = claw.y-20;
        claw.draw();
        if(claw.y!=-600){
            setTimeout(arguments.callee,200)
        }else{
            claw.canMove =true;
            canClick=true;
            clawMove()
        }
    }
    _n()
}
//----------爪子

//---------盒子
var boxImage = new Image();
boxImage.src = "img/box.png";
function boxObject(imgs){
    this.width = 57;
    this.height = 51;
    this.x = 480;
    this.y = 450;
    this.canMove = true;
    this.draw = function(){
        ctx.drawImage(imgs,this.x,this.y);
    };
    this.clear =function () {
        ctx.clearRect(this.x,this.y,this.width,this.height)
    }
}
var time;
var b =function(){
    time=setInterval(function () {
        createBox();
        console.log(boxList.length)
    },200);
}
boxImage.onload = function(){
    b();
};

//生成一个盒子  不断移动
var createBox = ()=> {
    var num = Math.floor(Math.random()*difficulty);
    if(num<=10){
        if(boxList.length<boxListMix){
            boxList.push(new boxObject(boxImage));
        }
    }
    boxList.forEach(function (item, index, array) {
        if(item.x<=0){
            item.clear();
            boxList.splice(index,1)
        }else{
            item.clear();
            item.x-=boxSpeed;
            item.draw();
        }

    });
}
//---------盒子