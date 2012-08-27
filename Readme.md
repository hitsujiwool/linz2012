# Linz2012 Prototype

## 全体の設計

app.js（DOMの世界）と、world.js（Three.jsの世界）は、状態管理を担当するStateオブジェクトを共有しています。ユーザーからの入力は（時間のコントロールやターゲットの表示／非表示など）はDOMが受けとり、Stateオブジェクトのプロパティ変更と、それにともなうイベントの発生という形でThree.jsに伝達されます。

プロットするデータはLogStreamオブジェクトやPersonオブジェクトとして抽象化されています。Three.jsとその中の構成要素、それぞれがこれらのStreamへの参照を持ち、dataイベントやconnectionイベントに応じて自身の内部状態を変更したり、新しいオブジェクトやパーティクルを生成します。

Three.js側のアニメーションのタイミングをDOMに通知する方法については、今回はあまり考えていません。必要になったときに実装します。

## LogStream

### Event: 'connection'

    funtion (person) { }

新規のターゲットを受信したときに実行されます。

## PersonStream

### Event: 'latest'

    function (data) { }

現在（リアルタイム）の位置データや姿勢データを受信したときに実行されます。

### Event: 'past'

    function (data) { }

過去の位置データや姿勢データを受信したときに実行されます。

典型的には、LogStreamと併せて

```javascript
logStream.on('connection', function(personStream) {
  console.log(personStream.id + ' connected.');
    
  // 新しいThree.js用のオブジェクト(Person)を作成
  var person = new Person(personStream);
      
  personStream.on('latest', function(data) {
    console.log('received latest data.');
    if (data.type === 'location') person.createNewParticle(data)
  });
  
  personStream.on('past', function(data) {
    console.log('received latest data.');
    if (data.type === 'location') person.createNewParticle(data)
  });  
});
```

のような使い方をします。

## State


### Event: 'show'

    function (id) { }

ターゲットが「表示」になったときに実行されます。

### Event: 'hide'

    function (id) { }

ターゲットが「非表示」になったときに実行されます。

### Event: 'speedchange'

    function (speed) { }
    
時計の速度が変更されたときに実行されます。

### Event: 'tick'

    function (time) { }
    
レコーダの時間が経過したときに実行されます。現状ではThree.jsのレンダリングループの中で自力でemitしているため、いささか自作自演のきらいがありますが、時計を独立したsetIntervalとして回す可能性があるので、敢えてイベントによるインターフェースを設けています。

### Event: 'zoom'
    
    function (val) { }
    
ズーム時に実行？　未実装。

### Event: 'layerchange'

    function (id) { }
    
表示レイヤー変更時に実行？　未実装。
