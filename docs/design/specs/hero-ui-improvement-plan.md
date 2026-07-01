# Hero UI 改善案（2026-07）

## 目的

現在のHeroセクションを、3Dキューブを主役にした印象的なレイアウトへ改善する。

## イメージ
![hero-sample-2](image.png)

## 最優先

### 1. コンテナ幅

現在

``` css
max-width: 1280px;
```

変更

``` css
max-width: 1440px;
padding-inline: 48px;
margin: 0 auto;
```

### 2. キューブを主役にする

-   サイズを1.3〜1.5倍
-   Hero幅の40〜45%を使用
-   左寄せに配置

### 3. レイアウト比率

``` css
grid-template-columns: 1.15fr 1fr;
```

または

``` css
grid-template-columns: 1.2fr 1fr;
```

## テキスト

見出し

``` css
font-size: clamp(48px, 5vw, 72px);
line-height: 1.1;
max-width: 620px;
```

文章は2〜3行程度に収める。

## キューブ

追加したい演出

-   Float
-   Bloom
-   リムライト
-   面クリック
-   面ホバー
-   面アイコン

## リング

-   サイズ1.6倍
-   発光強化
-   ぼかし追加

## 下部カード

-   高さ140〜160px
-   Hoverで浮く
-   Activeカードだけ発光

## 実装順

1.  max-widthを1440pxへ変更
2.  HeroのGrid比率変更
3.  キューブ大型化
4.  見出し調整
5.  リング改善
6.  カード改善
7.  Bloom・Float追加

## ゴール

「3Dキューブがブランドになるポートフォリオ」を目指す。
