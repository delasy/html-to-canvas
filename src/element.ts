import { camelToKebabCase, has } from './utils'

export interface ElementNode {
  render (container: HTMLElement): this
}

export interface ElementProps {
  style?: ElementPropsStyle
}

export interface ElementPropsStyle {
  [K: string]: string
}

export type ElementFragmentBody = number | string
export type ElementChildren = ElementNode | ElementNode[]
export type ElementType = 'button' | 'div'

let lastId: null | string = null

function childrenToNodes (children: ElementChildren[]): ElementNode[] {
  const result: ElementNode[] = []

  for (const child of children) {
    if (Array.isArray(child)) {
      for (const childChild of child) {
        result.push(childChild)
      }
    } else {
      result.push(child)
    }
  }

  return result
}

function nextId (): string {
  if (lastId === null) {
    lastId = 'AAAAAA'
    return lastId
  }

  const chs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const chsLen = chs.length

  for (let i = lastId.length - 1; i >= 0; i--) {
    const chPos = chs.indexOf(lastId[i] as string)

    if (chPos < chsLen - 1) {
      lastId = lastId.slice(0, i) + chs[chPos + 1] + lastId.slice(i + 1)
      break
    }

    lastId = lastId.slice(0, i) + 'A' + lastId.slice(i + 1)

    if (i === 0) {
      lastId = 'A' + lastId
    }
  }

  return lastId
}

class Element implements ElementNode {
  private _cssText: string = ''
  private readonly _id: string
  private readonly _nodes: ElementNode[]
  private readonly _props: ElementProps
  private readonly _type: ElementType

  constructor (
    type: ElementType,
    props: ElementProps,
    children: ElementChildren[]
  ) {
    this._id = nextId()
    this._nodes = childrenToNodes(children)
    this._props = props
    this._type = type
  }

  public mountStyles (): void {
    const stylesElement = document.createElement('style')
    stylesElement.id = 'test2134_a1B2c3D4'
    stylesElement.appendChild(document.createTextNode(this._getCSSText()))
    document.head.appendChild(stylesElement)
  }

  public render (container: HTMLElement): this {
    const element = document.createElement(this._type)
    element.className = this._id

    for (const node of this._nodes) {
      node.render(element)
    }

    container.appendChild(element)
    return this
  }

  protected _getCSSText () {
    this._cssText = ''

    if (has(this._props, 'style')) {
      const style = this._props.style!
      const propKeys = Object.keys(style).sort()

      for (const propKey of propKeys) {
        const propValue = style[propKey]
        this._cssText += `${camelToKebabCase(propKey)}:${propValue};`
      }
    }

    if (this._cssText !== '') {
      this._cssText = `.${this._id}{${this._cssText}}`
    }

    for (const node of this._nodes) {
      if (node instanceof Element) {
        this._cssText += node._getCSSText()
      }
    }

    return this._cssText
  }
}

class ElementFragment implements ElementNode {
  private readonly _body: ElementFragmentBody

  constructor (body: ElementFragmentBody) {
    this._body = body
  }

  public render (container: HTMLElement): this {
    container.appendChild(document.createTextNode(this._body.toString()))
    return this
  }
}

export function createElement (
  type: ElementType,
  props: ElementProps | null,
  ...children: ElementChildren[]
): Element {
  return new Element(type, props ?? {}, children)
}

export function createFragment (body: ElementFragmentBody): ElementFragment {
  return new ElementFragment(body)
}

export default Element
