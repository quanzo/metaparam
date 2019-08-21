![](https://badgen.net/badge/CodeX%20Editor/v2.0/blue)

# Meta tags tool

Provides page meta tags for the [CodeX Editor](https://ifmo.su/editor). Block has title, description and keywords.

## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev @quanzo/metaparam
```

Include module at your application

```javascript
const Metaparam = require('@quanzo/metaparam');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/editor.metaparam.js` file to your page.

### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@quanzo/metaparam).

`https://cdn.jsdelivr.net/npm/@quanzo/metaparam@latest`

Then require this script on page with CodeX Editor.

```html
<script src="..."></script>
```

## Usage

Add a new Tool to the `tools` property of the CodeX Editor initial config.

```javascript
var editor = CodexEditor({
  ...
  
  tools: {
    ...
    metaparam: Metaparam,
  },
  
  ...
});
```

Or init Metaparam Tool with additional settings

```javascript
var editor = CodexEditor({
  ...
  
  tools: {
    ...
    metaparam: {
      class: Metaparam,
      config: {
        titlePlaceholder: 'Title',
        descriptionPlaceholder: 'Description',
		    keywordsPlaceholder: 'Keywords',
      },
    },
  },
  
  ...
});
```

## Output data

| Field     | Type     | Description      |
| --------- | -------- | -----------------|
| title     | `string` | title  |
| description   | `string` | description |
| keywords   | `string` | keywords |

```json
{
    "type" : "metaparam",
    "data" : {
        "title" : "Page title",
        "description" : "Avoid using this method just for lulz. It can be very dangerous opposite your daily fun stuff.",
		    "keywords" : "keywords"
    }
}
```
