/**
 * Created by bjwsl-001 on 2017/6/8.
 */
var data=null,//保存二维数组
    RN= 5,CN= 5,score= 0,
    status= 1,
    GAMEOVER= 0,RUNNING=1;
//开始函数
function start(){
    //创建空数组保存在data中
    status=RUNNING;
    data=[];
    for(var i=0;i<RN;i++){
        //必须压入空数组，不然没法压入数值;
        data.push([]);
        for (var j=0;j<CN;j++){
            data[i].push(0);
        }
    }
    randomNum(); randomNum();//在游戏开始之前就随机生成2个随机数
    updateView();
    //事件:用户手动触发的页面内容状态的改变
    //事件处理函数: 当事件发生时，浏览器自动调用的函数
    //绑定事件处理函数:
    //将一个函数，赋值给事件属性
    //当键盘按下时，自动执行:
    document.onkeydown=function(e){
        //判断按键号
        switch(e.keyCode){
            case 37://左
                moveLeft();
                break;
            case 38://上
                moveUp();
                break;
            case 39://右
                moveRight();
                break;
            case 40://下
                moveDown();
        }
    }
}
function randomNum(){
    while(true){//条件为true是死循环，只有当内容中的条件执行了，才退出，否则一直循环。
    var r=parseInt(Math.random()*RN);//这两个放在循环内是因为如果此时格子有内容，就要重新随机一个位置。
    var c=parseInt(Math.random()*CN);
        if(data[r][c]==0){
            data[r][c]=Math.random()<0.5?2:4;
        break;}
    }
}
//将二位数组的内容更新到页面中去
function updateView(){
    for(var r=0;r<RN;r++){//遍历行
        for (var c=0;c<CN;c++){//遍历列，挨个空走
           var div=document.getElementById("c"+r+c);//先找到页面中对应的div
            if(data[r][c]!=0)//如果内容不为0，需要填内容和样式进去
                {   div.innerHTML=data[r][c];//填内容
                    div.className="n"+data[r][c];//填样式
                }
            else{
                div.innerHTML="";//如果内容为0，则页面此div显示为空
               div.className="";//样式也为空
            }
        }
    }
    var span=document.getElementById("score");
    span.innerHTML=score;
    var div=//找到id为gameover的div
        document.getElementById("gameover");
    //如果status为GAMEOVER
    if(status==GAMEOVER){
        div.style.display="block";//设置div显示
        var span=//找到id为final的span
            document.getElementById("final");
        //设置span的内容为score
        span.innerHTML=score;
    }else//否则
        div.style.display="none";//设置div隐藏
}
//左移箭头时，程序进行对应运算
//向左
function moveLeft(){//总函数，开始遍历每个格子
    var before=String(data);//为所有内容拍照，为了以后判断是否变化做准备
    for (var r=0;r<RN;r++){//开始遍历行
       moveLeftInRow(r);//每行的运算都是一样的，因为比较繁琐，所以再写个函数。
    }
    var after=String(data);//为循环计算完的所有内容拍照，为了以后判断是否变化做准备
    if(before!=after){//当游戏发生计算的时候，生成随机数并且更新数据；
        randomNum();
        if(isGameOver()) status=GAMEOVER;
        updateView();
    }
}
function moveLeftInRow(r){//每行内的计算
    for (var c=0;c<CN-1;c++){//开始从第一个开始遍历
        var nextc=getNextInRow(r,c);//获取c位置后的下一个不为0的位置
        if (nextc==-1) break;//如果没找到，说明不用计算，此行运算就停止，退出行内循环，进行下一环
        else{//如果找到了，就进行以下操作
            if(data[r][c]==0){
                data[r][c]=data[r][nextc];
                data[r][nextc]=0;
                c--;
            }
            else if( data[r][c]==data[r][nextc]){
                data[r][c]*=2;
                score+= data[r][c];
                data[r][nextc]=0;
            }
        }
    }
}
function getNextInRow(r,c){
    for (var nextc=c+1;nextc<CN;nextc++){
        if (data[r][nextc]!=0) return nextc;
    }
    return -1;
}
//向右
function moveRight(){
    var before=String(data);
    for (var r=0;r<RN;r++){
        moveRightInRow(r);
    }
    var after=String(data);
    if (before!=after){
        randomNum();
        if(isGameOver()) status=GAMEOVER;
        updateView();
    }
}
function moveRightInRow(r){
    for (var c=CN-1;c>0;c--){
        var prevc=getPrevInRow(r,c);
        if (prevc==-1) break;
        else{
            if(data[r][c]==0){
                data[r][c]=data[r][prevc];
                data[r][prevc]=0;
                c++;
            }
            else if(data[r][c]==data[r][prevc]){
                data[r][c]*=2;
                score+= data[r][c];
                data[r][prevc]=0;
            }
        }
    }
}
function getPrevInRow(r,c){
    for (var prevc=c-1;prevc>=0;prevc--){
        if(data[r][prevc]!=0) return prevc;
    }
    return -1;
}
//向上
function moveUp(){//总函数，开始遍历每个格子
    var before=String(data);//为所有内容拍照，为了以后判断是否变化做准备
    for (var c=0;c<CN;c++){//开始遍历行
        moveUpInColum(c);//每行的运算都是一样的，因为比较繁琐，所以再写个函数。
    }
    var after=String(data);//为循环计算完的所有内容拍照，为了以后判断是否变化做准备
    if(before!=after){//当游戏发生计算的时候，生成随机数并且更新数据；
        randomNum();
        if(isGameOver()) status=GAMEOVER;
        updateView();
    }
}
function moveUpInColum(c){//每行内的计算
    for (var r=0;r<RN-1;r++){//开始从第一个开始遍历
        var downr=getDownInColum(r,c);//获取c位置后的下一个不为0的位置
        if (downr==-1) break;//如果没找到，说明不用计算，此行运算就停止，退出行内循环，进行下一环
        else{//如果找到了，就进行以下操作
            if(data[r][c]==0){
                data[r][c]=data[downr][c];
                data[downr][c]=0;
                r--;
            }
            else if( data[r][c]==data[downr][c]){
                data[r][c]*=2;
                score+=data[r][c];
                data[downr][c]=0;
            }
        }
    }
}
function getDownInColum(r,c){
    for (var downr=r+1;downr<RN;downr++){
        if (data[downr][c]!=0) return downr;
    }
    return -1;
}

//向下
function moveDown(){
    var before=String(data);
    for (var c=0;c<CN;c++){
        moveDownInRow(c);
    }
    var after=String(data);
    if (before!=after){
        randomNum();
        if(isGameOver()) status=GAMEOVER;
        updateView();
    }
}
function moveDownInRow(c){
    for (var r=RN-1;r>0;r--){
        var prevr=getPrevInLine(r,c);
        if (prevr==-1) break;
        else{
            if(data[r][c]==0){
                data[r][c]=data[prevr][c];
                data[prevr][c]=0;
                r++;
            }
            else if(data[r][c]==data[prevr][c]){
                data[r][c]*=2;
                score+=data[r][c];
                data[prevr][c]=0;
            }
        }
    }
}
function getPrevInLine(r,c){
    for (var prevr=r-1;prevr>=0;prevr--){
        if(data[prevr][c]!=0) return prevr;
    }
    return -1;
}
function isGameOver(){
    //遍历data
    for(var r=0;r<RN;r++) {
        for (var c = 0; c < CN; c++) {
            if(data[r][c]==0) return false;
            if(c<CN-1&&data[r][c]==data[r][c+1])
                return false;
            if(r<RN-1&&data[r][c]==data[r+1][c])
                return false;
        }
    }
    return true;
}
start();
