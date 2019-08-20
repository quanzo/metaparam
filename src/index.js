/**
 * Build styles
 */
require('./index.css').toString();

/**
 * Import Tool's icon
 */
import ToolboxIcon from './svg/toolbox.svg';

/**
 * @class Metaparam
 * @classdesc Metaparam Tool for Editor.js
 * @property {MetaparamData} data - Metaparam Tool`s input and output data
 * @property {object} api - Editor.js API instance
 *
 * @typedef {object} MetaparamData
 * @description Metaparam Tool`s input and output data
 * @property {string} title - Meta title
 * @property {string} description - Meta description
 * @property {string} keywords - Meta keywords 
 *
 * @typedef {object} MetaparamConfig
 * @description Metaparam Tool`s initial configuration
 * @property {string} titlePlaceholder - placeholder to show in Metaparam`s title input
 * @property {string} descriptionPlaceholder - placeholder to show in Metaparam`s description input
 * @property {string} keywordsPlaceholder - placeholder to show in Metaparam`s description input
 * 
 */
export default class Metaparam {
  /**
   * Get Toolbox settings
   *
   * @public
   * @return {string}
   */
  static get toolbox() {
      return {
        icon: ToolboxIcon,
        title: 'Metaparam'
      };
  }

  /**
   * Allow to press Enter inside the Metaparam
   * @public
   * @returns {boolean}
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * Default placeholder for Metaparam title
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_TITLE_PLACEHOLDER() {
    return 'Title';
  }

  /**
   * Default placeholder for Metaparam description
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_DESCRIPTION_PLACEHOLDER() {
    return 'Description';
  }

  /**
   * Default placeholder for Metaparam description
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_KEYWORDS_PLACEHOLDER() {
    return 'Keywords';
  }

  /**
   * Metaparam Tool`s styles
   *
   * @returns {Object}
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      wrapper: 'cdx-metaparam',      
      input: this.api.styles.input,
      title: 'cdx-metaparam__title',
      description: 'cdx-metaparam__description',
      keywords: 'cdx-metaparam__keywords'
    };
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {MetaparamData} data — previously saved data
   * @param {MetaparamConfig} config — user config for Tool
   * @param {Object} api - Editor.js API
   */
  constructor({data, config, api}) {
    this.api = api;

    this.titlePlaceholder = config.titlePlaceholder || Metaparam.DEFAULT_TITLE_PLACEHOLDER;
    this.descriptionPlaceholder = config.descriptionPlaceholder || Metaparam.DEFAULT_DESCRIPTION_PLACEHOLDER;
    this.keywordsPlaceholder = config.keywordsPlaceholder || Metaparam.DEFAULT_KEYWORDS_PLACEHOLDER;

    this.data = {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || '',
    };
  }

  /**
   * Create Metaparam Tool container with inputs
   *
   * @returns {Element}
   */
  render() {
    const container = this._make('div', [this.CSS.baseClass, this.CSS.wrapper]);
    const title = this._make('div', [this.CSS.input, this.CSS.title], {
      contentEditable: true,
      innerHTML: this.data.title
    });
    const description = this._make('div', [this.CSS.input, this.CSS.description], {
      contentEditable: true,
      innerHTML: this.data.description
    });
    const keywords = this._make('div', [this.CSS.input, this.CSS.keywords], {
      contentEditable: true,
      innerHTML: this.data.keywords
    });

    title.dataset.placeholder = this.titlePlaceholder;
    description.dataset.placeholder = this.descriptionPlaceholder;
    keywords.dataset.placeholder = this.keywordsPlaceholder;

    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(keywords);

    return container;
  }

  /**
   * Extract Metaparam data from Metaparam Tool element
   *
   * @param {HTMLDivElement} MetaparamElement - element to save
   * @returns {MetaparamData}
   */
  save(MetaparamElement) {
    const title = MetaparamElement.querySelector(`.${this.CSS.title}`);
    const description = MetaparamElement.querySelector(`.${this.CSS.description}`);
    const keywords = MetaparamElement.querySelector(`.${this.CSS.keywords}`);

    return Object.assign(this.data, {
      title: title.innerHTML,
      description: description.innerHTML,
      keywords: keywords.innerHTML
    });
  }

  /**
   * Helper for making Elements with attributes
   *
   * @param  {string} tagName           - new Element tag name
   * @param  {array|string} classNames  - list or name of CSS classname(s)
   * @param  {Object} attributes        - any attributes
   * @return {Element}
   */
  _make(tagName, classNames = null, attributes = {}) {
    let el = document.createElement(tagName);

    if ( Array.isArray(classNames) ) {
      el.classList.add(...classNames);
    } else if( classNames ) {
      el.classList.add(classNames);
    }

    for (let attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }

  /**
   * Sanitizer config for Metaparam Tool saved data
   * @return {Object}
   */
   static get sanitize() {
      return {
          title: {},
          description: {},
          keywords: {},          
      };
  }
}

