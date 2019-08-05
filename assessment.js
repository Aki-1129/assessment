(function(){
    'use strict';
    const userNameInput= document.getElementById('user-name');
    const assessmentButton= document.getElementById('assessment');
    const resultDivided= document.getElementById('result-area');
    const tweetDivided= document.getElementById('tweet-area');
   
    function removeAllChildren(element){  //functionにして簡潔に診断結果を全削除。(element)は関数の実行時にそれが適用される範囲を指定
   while(element.firstChild){    //while文は与えられた論理式がtrueの時に実行する制御文。
　   element.removeChild(element.firstChild);
   }
    }
   
    assessmentButton.onclick= () => {   //『()=>』の部分はアロー関数。function() と同じ意味。
        const userName= userNameInput.value;  //valueプロパティはテキストエリアに入力された文字列を受け取ることができる。
       if(userName.length===0){  //何も入力されてないときは動かないようにするガード句。
           return;
       }

    
        //診断結果の表示エリアの作成   
    removeAllChildren(resultDivided);  //残ってる診断結果をここで全削除
    const header= document.createElement('h3');
    header.innerText= '診断結果';
    resultDivided.appendChild(header);

    const paragraph= document.createElement('p');
    const result= assessment(userName);
    paragraph.innerText= result;
    resultDivided.appendChild(paragraph);
    
   
       //tweetエリアの作成
    removeAllChildren(tweetDivided);
    const anchor= document.createElement('a');
    const hrefValue= 'https://twitter.com/intent/tweet?button_hashtag='+encodeURIComponent('あなたのええところ')+'&ref_src=twsrc%5Etfw';
    anchor.setAttribute ('href',hrefValue);    //↑のencodeURIComponentはURIのなかの『＃あなたのええところ』の部分をURIのクエリに入れるようにしてるu
    anchor.className= 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText= 'Tweet #あなたのええところ';
    tweetDivided.appendChild(anchor);
    twttr.widgets.load();     //htmlにあるscriptを実行する。twitterのサーバー上にあるwidgets.jsっていうscriptを読み込む。
    };  //{}の場所は正確に。
    

    

     


const answers=[  //constは１回代入すると再代入できない定数の宣言
'{userName}のええところは、、、無いです。',
'{userName}のええところは、、、無いなぁ。',
'{userName}のええところは、、、。無くても生きていけるで。。',
'{userName}のええところは、、、Not Found.',
'{userName}のええところは、、、無し。',
'{userName}のええところは、、、、、、。　そういえばあの話聞いた？、、、',
'{userName}のええところは、、、見た目です（個人の感想です）。',
'{userName}のええところは、、、全部やで。多分',
'{userName}のええところは、、、よく食べるところです。知らんけど。',
'{userName}のええところは、、、右利きなところです。',
'{userName}のええところは、、、ジャニス・ジョプリンと共通点が多いところです。（例：人間、）',
'{userName}のええところは、、、半ズボンが似合うところです。',
'{userName}のええところは、、、拍手の音が大きいところです。',
'{userName}のええところは、、、フレディ・マーキュリーと共通点が多いところです。（例：男性、人間）',
'{userName}のええところは、、、ダンスが上手いです。知らんけど。',
];
function  assessment(userName) {
    let sumOfcharCode= 0;   //letはifやfor文内で適用される変数の宣言
    //入力された文字のコードを全部足しあわせる。
    for(let i= 0; i< userName.length; i++){  
        sumOfcharCode= sumOfcharCode+ userName.charCodeAt(i);
    }
    const index= sumOfcharCode % answers.length;  //文字コードの合計値（sumOfcharcode）を診断結果のパターン数で割って余りを求める。
    let result= answers[index];
   result= result.replace(/{userName}/g,userName);  //『/{userName}/g,は正規表現。usernameという文字列自身に合うものを複数回適用するって意味
    return result;

    }
   
    //enterキーを押して診断できるようにする
    userNameInput.onkeydown= (event)=>{   //無名関数。event.keyで入力されたキーを取得
        if(event.key=== 'Enter'){  
            assessmentButton.onclick();  //プロパティonclickに代入されている関数を呼び出す
        }
        };

    console.assert(     //console.assertは（）内の式をテストできる。failedは間違ってるとき表示する文
        assessment('太郎')===assessment('太郎'),
        'failed'
    )
    
}
)();
