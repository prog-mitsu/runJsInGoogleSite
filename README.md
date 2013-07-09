runJsInGoogleSite
=================

Move freely javascript in google site

## はじめに

googleサイト上で色々見た目をリッチ化したい、というミッションがあり、結構大変だったので
主に未来の自分に向けてメモを残しておきます。

GASのHTMLServiceを使っても色々できるようですが、Google Caja内での動作につき色々制限有。

あと、HTMLボックスでも行ける感じだったので試してみましたが、jQueryのバージョンが
特定以外だとダメだったり、やはりこちらも色々制限があります。

また、今回はどうしても従来のgoogle site内のコンテンツを拡張するというミッションだったため、
既存のgoogleサイト内にガジェットを配置する方法でjavascriptを走らせました。

できれば新しめの方法でいきたかったのですが、 <del>ぶっちゃけ時間無いしめんどくさい</del> 大人の判断で
安全策を採択という事です。
**※もっと簡単で良い方法があるはずです、だれか教えて下さい**


## 既存の方法おさらい
*詳しくは [参考サイト](#section1) を参照*

1.ガジェットxmlを書く
2.そのファイルをweb上の参照できるところに置く
3.googleサイト上でガジェットを配置し、ガジェットのURLに上記2.で置いたところを指定する
これらが基本的な方法です。

が、色々ハマった所がありました。

###置き場所
  dropboxのpublicに置く方法も紹介されていましたが、どうせならgoogleのサービスで統一したい。
  → **google siteを作ってファイルを添付する方法が便利です**

![google site](https://lh4.googleusercontent.com/-tOCxpNV9IRA/Udta7tWGNcI/AAAAAAAAG9I/9gkEPKdiV0s/s687/2013-07-09_09h34_13.png)
<br>
<br>
+ サイトに各種ファイルを添付します

![google site](https://lh5.googleusercontent.com/-yIn8BTWVdB0/Udttz1Ga-4I/AAAAAAAAG9g/GGfmYInGZmI/s588/2013-07-09_10h55_46.png)
<br>
<br>

###ガジェット内で外部javascriptやCSSを読み込ませる
  方法が参考サイトで紹介されていましたが、うまく行かず。
  各種例では、外部ファイルをhttpプロトコルで呼び出しており、（ブラウザによっては）
  SSLコンテンツ混在で怒られたりする。 各種例の掲載時にはコレでも通ってたのかな？
  → 外部ファイルの読み込み指定は、http, httpsを省略して記述すると自動判定してくれるので通る。

####こんな感じにガジェット用xmlを書きつつ、動かしたいスクリプトを読み込みます

```xml:myapp.xml
<?xml version="1.0" encoding="UTF-8" ?>
<Module>
  <!-- ガジェット名 -->
  <ModulePrefs title="myapp" />

  <!-- ガジェットから渡すユーザーパラメータの定義 -->
  <UserPref name="param00" datatype="string" default="9999" />
  <UserPref name="param01" datatype="string" default="hoge" />

  <Content type="html">
    <![CDATA[
        <!-- CDNから読み込み(http, https省いています) -->
        <script type="text/javascript" src='//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js '></script>
        <script type="text/javascript" src='//ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js'></script>
        <link rel="stylesheet" type="text/css" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/redmond/jquery-ui.css">
        
        <!-- google site添付から読み込み(https省いています) -->
        <!-- ライブラリ -->
        <script type="text/javascript" src='//sites.google.com/site/qiitatestpublic/jquery.jqGrid.src.js'></script>
        <script type="text/javascript" src='//sites.google.com/site/qiitatestpublic/grid.locale-ja.js'></script>
        <script type="text/javascript" src='//sites.google.com/site/qiitatestpublic/apprise-1.5.full.js'></script>
        <link rel="stylesheet" type="text/css" href="//sites.google.com/site/qiitatestpublic/apprise.css">
            
        <!-- 自前コード -->
        <script type="text/javascript" src='//sites.google.com/site/qiitatestpublic/myapp.js'></script>
        
        
        <!-- 実行 -->
        <script type="text/javascript">
            $(document).ready(function(){
                MYAPP.setJqGrid("#jqGridList");
                apprise('TEST', {'animate':true});
            });
        </script>
        
        
      <h2 class="ui-widget-header ui-corner-all">テスト</h2>
	    <br>
        <table id="jqGridList"> </table>

    ]]>
  </Content>
</Module>
```

###サイトにgadgetとして貼り付ける
+ サイトに適当にページを作る
+ 挿入 → その他のガジェット → URLを指定してガジェットを追加
指定するURLは、 **サイトのURL + ガジェットxmlファイル名** を指定してください
例 https://sites.google.com/site/XXXXXX/gadget_myapp.xml

+ 幅や高さはお好みで設定
+ 外部から渡すパラメータは、サイトからスクリプトに自由にパラメータ渡せるので適宜利用

###動作サンプル
[サンプルページ](https://sites.google.com/site/qiitatestpublic/)を設置しました。
こんな感じで、わりと自由に動かせますのでJavaScriptを軽く書いたりサービスのプロトタイプ作って公開したいけど、
いちいちホスティング確保してられないケースなどに便利だと思います。
大事なので２度書きますが、**※もっと簡単で良い方法があるはずです、だれか教えて下さい**


## 参考サイト
<a name="section1">  
[2011-02-22 - sho235711](http://d.hatena.ne.jp/sho235711/20110222)
[×4 new B's: プログラムはじめてみました Google sitesでjQuery/JavaScriptを使う](http://5garashi.blog.fc2.com/blog-entry-23.html)
[HTMLやCSSでのプロトコル表記（http:、https:）の省略について: 小粋空間](http://www.koikikukan.com/archives/2012/05/11-012345.php)
