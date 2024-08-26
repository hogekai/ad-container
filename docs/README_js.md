# AdContainer

AdContainerは、広告などのサードパーティコンテンツを、単純なタグで囲むだけで完全に独立した環境で実行できる強力なWebコンポーネントです。

## 主な特徴

- **簡単な統合**: コンテンツを`<ad-container>`タグで囲むだけです。
- **完全な分離**: 完全に別個の`window`オブジェクトと実行コンテキストを提供します。
- **セキュリティ**: サードパーティスクリプトがメインページにアクセスしたり干渉したりすることを防ぎます。
- **使いやすさ**: 複雑なセットアップや設定は不要です。

## インストール

```bash
npm install ad-container
```

## 使用方法

1. コンポーネントをインポートします：

```html
<script src="https://cdn.jsdelivr.net/npm/ad-container@latest/dist/ad-container.umd.js"></script>
```

```javascript
import 'ad-container';
```

注意事項: 必ず使用するタグ (<ad-container>)の前に読み込みを完了してください。

2. HTMLで使用します：

```html
<ad-container>
  <!-- サードパーティコンテンツや広告コードをここに配置 -->
  <script>
    // このスクリプトは独立した環境で実行されます
    console.log(window); // これは別個のwindowオブジェクトです
  </script>
</ad-container>
```

## 動作原理

AdContainerは各インスタンスに対してサンドボックス化されたiframeを作成し、新しい独立した`window`オブジェクトと実行コンテキストを提供します。これにより、`<ad-container>`内のコードがメインページと相互作用したり影響を与えたりすることがなく、セキュリティと安定性が向上します。

## セキュリティに関する注意

AdContainerは強力な分離を提供しますが、アプリケーションにサードパーティコンテンツを含める際は常に注意を払ってください。

## ライセンス

このプロジェクトはMITライセンスの下で提供されています。詳細は[LICENSE](../LICENSE)ファイルをご覧ください。